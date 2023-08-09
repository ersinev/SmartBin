import React, { useState } from 'react';
import './App.css';
import GarbageAnimation from './GarbageAnimation';
import WeightData from './WeightData';

function App() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const maxFillLevel = 3000; // Maximum capacity of the garbage in grams

  const handleWeightChange = (newWeight) => {
    // Calculate the fill percentage based on the data from Adafruit
    const fillPercentage = (newWeight / maxFillLevel) * 100;
    setFillPercentage(fillPercentage);
  };

  return (
    <div className="app">
      <h1>Garbage Animation</h1>
      <WeightData onWeightChange={handleWeightChange} />
      <GarbageAnimation maxFillLevel={maxFillLevel} fillPercentage={fillPercentage} />
      <p>Garbage Fill Percentage: {fillPercentage.toFixed(2)}%</p>
    </div>
  );
}

export default App;
