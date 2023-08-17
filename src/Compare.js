import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CompareChart({ chartData }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="className" />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartData.map((dataItem, index) => (
          <Bar
            key={index}
            dataKey="uv"
            data={dataItem.data}
            fill={`hsla(${(index * (360 / chartData.length))}, 70%, 50%, 1)`}
          />
        ))}
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
            const structuredData = data.filter(item => item && item.value).map(item => ({
              uv: parseFloat(item.value),
            }));
            return { data: structuredData, className: dataItem.className };
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
      <Button onClick={handleOpenChartModal}>Compare Classes</Button>
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
