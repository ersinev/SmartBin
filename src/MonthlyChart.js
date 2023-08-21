import React, { useState, useEffect } from 'react';
import { Modal, Container, Row, Col } from 'react-bootstrap';
//import SimpleAreaChart from './altCharts/SimpleAreaChart';
//import SimpleFunnelChart from './altCharts/SimpleFunnelChart';
//import SimpleStreamChart from './altCharts/SimpleStreamChart';
//import MyResponsiveAreaBump from './altCharts/MyResponsiveAreaBump';
import SimpleBarChart from './altCharts/SimpleBarChart';
import CalendarChart from './altCharts/CalendarChart';
import SimplePieChart from './altCharts/SimplePieChart';





function MonthlyChart({ data, showModal, handleClose, capacity }) {
  const [chartData, setChartData] = useState(null);
  

  useEffect(() => {
    setChartData(null); 

    if (data) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://io.adafruit.com/api/v2/${data.adafruitUsername}/feeds/${data.feedKey}/data`,
            {
              headers: {
                "X-AIO-Key": data.adafruitIoKey,
              },
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            if (responseData && responseData.length > 0) {
              setChartData(responseData.map(item => {
                return {
                  uv: Math.round(parseFloat(item.value)),
                  date: item.created_at.split('T')[0],
                  className: data.className
                };
              }));
            } else {
              console.warn("No data received from API.");
            }
          } else {
            console.warn(`Failed fetching for ${data.adafruitUsername}/${data.feedKey}`);
          }
        } catch (error) {
          console.warn(`Error fetching or processing data for ${data.adafruitUsername}/${data.feedKey}:`, error);
        }
      };

      fetchData();
    }
  }, [data]);

  return (
    <Modal show={showModal} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Specific Data For Each Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chartData ? (
          <Container>
            <Row>
              <Col md={12}>
                <CalendarChart chartData={chartData} />
              </Col>
             
            </Row>
            <Row>
              <Col md={7}>
              <SimplePieChart chartData={chartData} />
              </Col>
              <Col md={5}>
                <SimpleBarChart chartData={chartData} />
              </Col>
             
            </Row>
          </Container>
        ) : (
          <p>Loading...</p>  // You can replace this with a spinner or any loading animation if you prefer.
        )}
      </Modal.Body>
    </Modal>
  );
}

export default MonthlyChart;
