import React, { useEffect, useState } from "react";
import "./App.css";
import GarbageAnimation from "./GarbageAnimation";
import WeightData from "./WeightData";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [adafruitUsername, setAdafruitUsername] = useState("");
  const [feedKey, setFeedKey] = useState("");
  const [adafruitIoKey, setAdafruitIoKey] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [originalSchoolName, setOriginalSchoolName] = useState("");
  const [className, setClassName] = useState("");
  const [originalClassName, setOriginalClassName] = useState("");
  const [fetchingData, setFetchingData] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [isHidden, setisHidden] = useState(true);

  const maxFillLevel = 1000;

  useEffect(() => {
    const storedData = localStorage.getItem("savedData");
    if (storedData) {
      setSavedData(JSON.parse(storedData));
    }
  }, []);

  const handleWeightChange = (newWeight) => {
    const fillPercentage = (newWeight / maxFillLevel) * 100;
    setFillPercentage(fillPercentage);
  };

  const startFetching = (data) => {
    setFetchingData(true);
    setOriginalSchoolName(data.schoolName);
    setOriginalClassName(data.className);
    setAdafruitUsername(data.adafruitUsername);
    setFeedKey(data.feedKey);
    setAdafruitIoKey(data.adafruitIoKey);
    setisHidden(false);
  };

  const saveData = () => {
    const newData = {
      schoolName: schoolName,
      className:  className,
      adafruitUsername,
      feedKey,
      adafruitIoKey,
    };
    const updatedSavedData = [...savedData, newData];
    setSavedData(updatedSavedData);

    // Clear the input fields after saving
    setSchoolName("");
    setClassName("");
    setAdafruitUsername("");
    setFeedKey("");
    setAdafruitIoKey("");

    localStorage.setItem("savedData", JSON.stringify(updatedSavedData));
  };

  const deleteSavedData = (index) => {
    const newSavedData = savedData.filter((_, i) => i !== index);
    setSavedData(newSavedData);

    localStorage.setItem("savedData", JSON.stringify(newSavedData));
  };

  // Separate state variables for fetched data
  
  return (
    <Container fluid>
      <div className="app">
        <h1>Garbage Animations</h1>
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
                  <button onClick={() => startFetching(data)}>Start Fetching</button>
                  <button onClick={() => deleteSavedData(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Row hidden={isHidden}>
          <Col md={4}>
            <div>{originalSchoolName || schoolName}</div>
            <div>{originalClassName || className}</div>
            <WeightData
              onWeightChange={handleWeightChange}
              adafruitUsername={adafruitUsername}
              feedKey={feedKey}
              adafruitIoKey={adafruitIoKey}
              fetchingData={fetchingData}
            />
            <GarbageAnimation
              maxFillLevel={maxFillLevel}
              fillPercentage={fillPercentage}
            />
            <p>Garbage Fill Percentage:  {fillPercentage.toFixed(2)}%</p>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default App;