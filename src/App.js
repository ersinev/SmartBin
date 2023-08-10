import React, { useEffect, useState } from "react";
import "./App.css";
import GarbageAnimation from "./GarbageAnimation";
import WeightData from "./WeightData";

function App() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [adafruitUsername, setAdafruitUsername] = useState("");
  const [feedKey, setFeedKey] = useState("");
  const [adafruitIoKey, setAdafruitIoKey] = useState("");
  const [schoolName, setSchoolName] = useState(""); // New state for School Name
  const [className, setClassName] = useState(""); // New state for Class Name
  const [fetchingData, setFetchingData] = useState(false);
  const [savedData, setSavedData] = useState([]);

  const maxFillLevel = 1000;

  useEffect(() => {
    // Load data from local storage when the component mounts
    const storedData = localStorage.getItem("savedData");
    if (storedData) {
      setSavedData(JSON.parse(storedData));
    }
  }, []);

  const handleWeightChange = (newWeight) => {
    const fillPercentage = (newWeight / maxFillLevel) * 100;
    setFillPercentage(fillPercentage);
  };

  const startFetching = () => {
    setFetchingData(true);
  };

  const saveData = () => {
    const newData = {
      schoolName,
      className,
      adafruitUsername,
      feedKey,
      adafruitIoKey,
    };
    const updatedSavedData = [...savedData, newData];
    setSavedData(updatedSavedData);

    // Save data to local storage
    localStorage.setItem("savedData", JSON.stringify(updatedSavedData));
  };

  const deleteSavedData = (index) => {
    const newSavedData = savedData.filter((_, i) => i !== index);
    setSavedData(newSavedData);

    // Update local storage after deleting data
    localStorage.setItem("savedData", JSON.stringify(newSavedData));
  };

  const handleUseSavedData = (index) => {
    const selectedData = savedData[index];
    if (selectedData) {
      setSchoolName(selectedData.schoolName);
      setClassName(selectedData.className);
      setAdafruitUsername(selectedData.adafruitUsername);
      setFeedKey(selectedData.feedKey);
      setAdafruitIoKey(selectedData.adafruitIoKey);
    }
  };

  return (
    <div className="app">
      <h1>Garbage Animation</h1>
      <div className="input-table">
        <div className="input-row">
          <div className="input-cell">
            <label>School Name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />
          </div>
          <div className="input-cell">
            <label>Class Name</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
          </div>
          <div className="input-cell">
            <label>Adafruit Username</label>
            <input
              type="text"
              value={adafruitUsername}
              onChange={(e) => setAdafruitUsername(e.target.value)}
            />
          </div>
          <div className="input-cell">
            <label>Feed Key</label>
            <input
              type="text"
              value={feedKey}
              onChange={(e) => setFeedKey(e.target.value)}
            />
          </div>
          <div className="input-cell">
            <label>Adafruit IO Key</label>
            <input
              type="text"
              value={adafruitIoKey}
              onChange={(e) => setAdafruitIoKey(e.target.value)}
            />
          </div>
          <div className="input-cell">
            <button onClick={startFetching}>Start Fetching</button>
          </div>
          <div className="input-cell">
            <button onClick={saveData}>Save</button>
          </div>
        </div>
      </div>

      <h2>Saved Data</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>School Name</th>
            <th>Class Name</th>
            <th>Adafruit Username</th>
            <th>Feed Key</th>
            <th>Adafruit IO Key</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {savedData.map((data, index) => (
            <tr key={index}>
              <td>{data.schoolName}</td>
              <td>{data.className}</td>
              <td>{data.adafruitUsername}</td>
              <td>{data.feedKey}</td>
              <td>{data.adafruitIoKey}</td>
              <td>
                <button id="fetchBtn" onClick={() => handleUseSavedData(index)}>Use</button>
                <button id="saveBtn" onClick={() => deleteSavedData(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <WeightData
        onWeightChange={handleWeightChange}
        adafruitUsername={adafruitUsername}
        feedKey={feedKey}
        adafruitIoKey={adafruitIoKey}
        fetchingData={fetchingData}
      />
      <GarbageAnimation maxFillLevel={maxFillLevel} fillPercentage={fillPercentage} />
      <p>Garbage Fill Percentage: {fillPercentage.toFixed(2)}%</p>
    </div>
  );
}

export default App;
