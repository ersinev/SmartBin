import React, { useState } from "react";
import MonthlyChart from "./MonthlyChart";
function DataTable({
  savedData,
  searchTerm,
  startFetching,
  renderCapacityInput,
  deleteSavedData,
  compareButton,
}) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  return (
    <div className="data-table">
      <div className="table-responsive">
        <table className="scrollable-table">
          <thead>
            <tr>
              <th>School Name</th>
              <th>Class Name</th>
              <th>Adafruit Username</th>
              <th>Feed Key</th>
              <th>Adafruit IO Key</th>
              <th>Capacity</th>
              <th className="actions-header">
                Actions
                <div className="compare-button-container">{compareButton}</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {savedData
              .filter(
                (data) =>
                  data.schoolName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  data.className
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((data, index) => (
                <tr key={index}>
                  <td>{data.schoolName}</td>
                  <td>{data.className}</td>
                  <td>{data.adafruitUsername}</td>
                  <td>{data.feedKey}</td>
                  <td>{data.adafruitIoKey}</td>
                  <td>{renderCapacityInput(data, index)}</td>
                  <td>
                    <button onClick={() => startFetching(data)}>
                      Start Fetching
                    </button>
                    <button
                      style={{ backgroundColor: "#ffcc00" }}
                      onClick={() => setShowModal(true)}
                    >
                      Monthly Chart
                    </button>
                    <button
                      style={{ backgroundColor: "#ff3333" }}
                      onClick={() => deleteSavedData(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <MonthlyChart showModal={showModal} handleClose={handleClose} />
    </div>
  );
}

export default DataTable;
