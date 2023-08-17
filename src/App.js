import React, { useEffect, useState } from "react";
import "./App.css";
import Chart from "./Chart";
import { Container } from "react-bootstrap";
import GarbageAnimation from "./GarbageAnimation";
import WeightData from "./WeightData";
import SearchBar from "./SearchBar";
import PieChart from "./PieChart";
import DataTable from "./DataTable";

function App() {
  const [adafruitUsername, setAdafruitUsername] = useState("");
  const [feedKey, setFeedKey] = useState("");
  const [adafruitIoKey, setAdafruitIoKey] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [className, setClassName] = useState("");
  const [capacity, setCapacity] = useState(1000);
  const [fetchingData, setFetchingData] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [hiddenSections, setHiddenSections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("savedData");
    if (storedData) {
      setSavedData(JSON.parse(storedData));
    }
  }, []);

  const handleWeightChange = (dataIndex, newWeight) => {
    setHiddenSections((prevHiddenSections) =>
      prevHiddenSections.map((section, index) =>
        index === dataIndex ? { ...section, weight: newWeight } : section
      )
    );
  };

  const handleCapacityChange = (index, newCapacity) => {
    setSavedData((prevSavedData) =>
      prevSavedData.map((data, dataIndex) =>
        dataIndex === index ? { ...data, capacity: newCapacity } : data
      )
    );
  };

  const fetchChartData = async (section, index) => {
    try {
      const response = await fetch(
        `https://io.adafruit.com/api/v2/${section.data.adafruitUsername}/feeds/${section.data.feedKey}/data`,
        {
          headers: {
            "X-AIO-Key": section.data.adafruitIoKey,
          },
        }
      );
      const chartData = await response.json();

      if (chartData.length > 0) {
        const latestData = chartData[0]; // Get the latest chart data point
        console.log(chartData);
        setHiddenSections((prevHiddenSections) =>
          prevHiddenSections.map((s, i) =>
            i === index ? { ...s, chartData, latestData, showChart: true } : s
          )
        );
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const toggleChart = (index) => {
    setHiddenSections((prevHiddenSections) =>
      prevHiddenSections.map((section, i) =>
        i === index ? { ...section, showChart: !section.showChart } : section
      )
    );
  };

  const startFetching = async (data) => {
    setFetchingData(true);
    setSchoolName(data.schoolName);
    setClassName(data.className);
    setAdafruitUsername(data.adafruitUsername);
    setFeedKey(data.feedKey);
    setAdafruitIoKey(data.adafruitIoKey);
    setCapacity(data.capacity);
    setHiddenSections((prevHiddenSections) => [
      ...prevHiddenSections,
      { data: { ...data }, weight: 0, showChart: false, chartData: [] },
    ]);
  };

  const saveData = () => {
    const newData = {
      schoolName,
      className,
      adafruitUsername,
      feedKey,
      adafruitIoKey,
      capacity,
    };
    const updatedSavedData = [...savedData, newData];

    setSavedData(updatedSavedData);
    setSchoolName("");
    setClassName("");
    setAdafruitUsername("");
    setFeedKey("");
    setAdafruitIoKey("");
    setCapacity(1000);

    localStorage.setItem("savedData", JSON.stringify(updatedSavedData));
  };

  const deleteSavedData = (index) => {
    const newSavedData = savedData.filter((_, i) => i !== index);
    setSavedData(newSavedData);

    setHiddenSections((prevHiddenSections) =>
      prevHiddenSections.filter((_, i) => i !== index)
    );

    localStorage.setItem("savedData", JSON.stringify(newSavedData));
  };

  const renderCapacityInput = (data, index) => {
    return (
      <input
        type="number"
        value={data.capacity}
        onChange={(e) => handleCapacityChange(index, Number(e.target.value))}
      />
    );
  };

  return (
    <Container fluid>
      <img src={require("./logo.png")} alt="Logo" />
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
              <label>Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            </div>
            <div className="input-cell">
              <button onClick={saveData}>Save</button>
            </div>
          </div>
        </div>

        <h2>Search Data</h2>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Container fluid>
        <DataTable
          savedData={savedData}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          startFetching={startFetching}
          renderCapacityInput={renderCapacityInput}
          deleteSavedData={deleteSavedData}
        />
        </Container>

        <div className="hidden-sections-container">
          {hiddenSections.map((section, index) => (
            <div key={index} className="hidden-section">
              <div className="section-header">
                <div className="section-header-school">
                  <span>{section.data.schoolName}</span>
                </div>
                <div className="section-header-class">
                  {section.data.className}
                </div>
                <div className="section-header-buttons">
                  <button
                    className="chart-button"
                    onClick={() => {
                      if (!section.showChart) {
                        fetchChartData(section, index);
                      } else {
                        toggleChart(index);
                      }
                    }}
                  >
                    {section.showChart ? "Bin" : "Chart"}
                  </button>
                  <button
                    className="close-button"
                    onClick={() =>
                      setHiddenSections((prevHiddenSections) =>
                        prevHiddenSections.filter((_, i) => i !== index)
                      )
                    }
                  >
                    X
                  </button>
                </div>
              </div>
              <WeightData
                onWeightChange={(newWeight) =>
                  handleWeightChange(index, newWeight)
                }
                adafruitUsername={section.data.adafruitUsername}
                feedKey={section.data.feedKey}
                adafruitIoKey={section.data.adafruitIoKey}
                fetchingData={fetchingData}
              />
              <div
                className={`chart-container ${
                  section.showChart ? "visible" : "hidden"
                }`}
              >
                <Chart
                  data={section.chartData}
                  capacity={section.data.capacity}
                  style={{ width: "100%", height: "100%" }}
                />
                {!section.showChart && section.chartData.length > 0 && (
                  <div className="latest-chart-value">
                    Latest Value: {section.chartData[0].value}
                  </div>
                )}
              </div>
              {section.showChart ? (
                <></>
              ) : (
                <>
                  <GarbageAnimation
                    fillPercentage={
                      (section.weight / section.data.capacity) * 100
                    }
                  />
                  <p>
                    Garbage Fill Percentage:{" "}
                    {((section.weight / section.data.capacity) * 100).toFixed(
                      2
                    )}
                    %
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <PieChart />
    </Container>
  );
}

export default App;
