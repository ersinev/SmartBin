import React, { useEffect, useState } from "react";

const WeightData = ({
  onWeightChange,
  adafruitUsername,
  feedKey,
  adafruitIoKey,
  fetchingData,
}) => {
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    if (!fetchingData) {
      return;
    }

    const fetchWeightData = async () => {
      try {
        const response = await fetch(
          `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/${feedKey}/data`,
          {
            headers: {
              "X-AIO-Key": adafruitIoKey,
            },
          }
        );
        const data = await response.json();

        if (data.length > 0) {
          const latestData = data[0];
          const newWeight = latestData.value;
          setWeight(Math.floor(newWeight));
          onWeightChange(newWeight);
        }
      } catch (error) {
        console.error("Error fetching weight data:", error);
      }
    };

    const interval = setInterval(fetchWeightData, 3000); // Fetch data every 1000ms

    return () => {
      clearInterval(interval);
    };
  }, [adafruitUsername, feedKey, adafruitIoKey, onWeightChange, fetchingData]);

  return (
    <div className="weight-data">
      <h2>
        <span style={{ color: "#3498db" }}>Weight:</span> {weight} gr
      </h2>
    </div>
  );
};

export default WeightData;
