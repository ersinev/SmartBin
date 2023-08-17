import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import { BsBarChart } from 'react-icons/bs';
function CompareChart({ chartData }) {
  const colors = chartData.map((_, index) => `hsla(${(index * (360 / chartData.length))}, 70%, 50%, 1)`);

  // Find the maximum value in the dataset and add a margin
  const maxYValue = Math.max(...chartData.map(item => item.uv));
  const maxYValueWithMargin = maxYValue + 0.2 * maxYValue;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            dataKey="className" 
            angle={-30} 
            textAnchor="end" 
            interval={0} 
            height={60}
        />
        <YAxis domain={[0, maxYValueWithMargin]} />
        <Tooltip />
        <Bar dataKey="uv" fill="#8884d8" label={{ position: 'top' }}>
          {
            chartData.map((dataItem, index) => (
              <Cell key={index} fill={colors[index]} />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function Compare({ savedData }) {
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [allFetchedChartData, setAllFetchedChartData] = useState([]);

  const handleOpenChartModal = async () => {
    setIsChartModalOpen(true);

    const fetchedChartData = await Promise.all(
      savedData.map(async (dataItem) => {
        try {
          const response = await fetch(
            `https://io.adafruit.com/api/v2/${dataItem.adafruitUsername}/feeds/${dataItem.feedKey}/data`,
            {
              headers: {
                "X-AIO-Key": dataItem.adafruitIoKey,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data && data.length > 0) {
              const firstItem = data[0];
              return {
                uv: Math.round(parseFloat(firstItem.value)),
                className: dataItem.className
              };
            }
            return null;
          } else {
            console.warn(`Failed fetching for ${dataItem.adafruitUsername}/${dataItem.feedKey}`);
            return null;
          }
        } catch (error) {
          console.warn(`Error fetching or processing data for ${dataItem.adafruitUsername}/${dataItem.feedKey}:`, error);
          return null;
        }
      })
    );

    const filteredChartData = fetchedChartData.filter(item => item !== null);
    setAllFetchedChartData(filteredChartData);
  };

  return (
    <>
      <Button className='compareBtn' onClick={handleOpenChartModal}><BsBarChart/></Button>
      <Modal
        show={isChartModalOpen}
        onHide={() => setIsChartModalOpen(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Class Data Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompareChart chartData={allFetchedChartData} />
        </Modal.Body>
      </Modal>
    </>
  );
}
