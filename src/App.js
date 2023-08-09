import { useState } from "react";

import './App.css';
import GarbageAnimation from './GarbageAnimation';
import WeightData from './WeightData';

function App() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [adafruitUsername, setAdafruitUsername] = useState('');
  const [feedKey, setFeedKey] = useState('');
  const [adafruitIoKey, setAdafruitIoKey] = useState('');
  const [fetchingData, setFetchingData] = useState(false); // New state for fetching data
  const maxFillLevel = 53; // Maximum capacity of the garbage in grams

  const handleWeightChange = (newWeight) => {
    const fillPercentage = (newWeight / maxFillLevel) * 100;
    setFillPercentage(fillPercentage);
  };

  const startFetching = () => {
    setFetchingData(true);
  };

  return (
    <div className="app">
      <h1>Garbage Animation</h1>
      <input
        type="text"
        placeholder="Adafruit Username"
        value={adafruitUsername}
        onChange={(e) => setAdafruitUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Feed Key"
        value={feedKey}
        onChange={(e) => setFeedKey(e.target.value)}
      />
      <input
        type="text"
        placeholder="Adafruit IO Key"
        value={adafruitIoKey}
        onChange={(e) => setAdafruitIoKey(e.target.value)}
      />
      <button onClick={startFetching}>Start Fetching</button> {/* Button to start fetching */}
      <WeightData
        onWeightChange={handleWeightChange}
        adafruitUsername={adafruitUsername}
        feedKey={feedKey}
        adafruitIoKey={adafruitIoKey}
        fetchingData={fetchingData} // Pass the state to WeightData
      />
      <GarbageAnimation maxFillLevel={maxFillLevel} fillPercentage={fillPercentage} />
      <p>Garbage Fill Percentage: {fillPercentage.toFixed(2)}%</p>
    </div>
  );
}
export default App;
