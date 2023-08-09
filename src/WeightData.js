import React, { useEffect, useState } from 'react';

const ADAFRUIT_IO_USERNAME = 'theITGarage';
const FEED_KEY = 'pressure2';
const ADAFRUIT_IO_KEY = 'aio_XaYX24za0E4ZW36X3HGT7WclgtVi';

const WeightData = ({ onWeightChange }) => { // Added prop onWeightChange
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    const fetchWeightData = async () => {
      try {
        const response = await fetch(
          `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${FEED_KEY}/data`,
          {
            headers: {
              'X-AIO-Key': ADAFRUIT_IO_KEY,
            },
          }
        );
        const data = await response.json();
        
        
        if (data.length > 0) {
          const latestData = data[data.length - 1];
          const newWeight = latestData.value;
          setWeight(newWeight);
          onWeightChange(newWeight); // Notify parent component about new weight
        }
      } catch (error) {
        console.error('Error fetching weight data:', error);
      }
    };

    const interval = setInterval(fetchWeightData, 1000); // Fetch data every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="weight-data">
      <h2>Weight Data: {weight} gr</h2>
    </div>
  );
};

export default WeightData;
