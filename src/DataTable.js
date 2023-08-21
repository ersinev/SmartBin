import React, { useState } from "react";
import MonthlyChart from "./MonthlyChart";
import {VscDebugStart} from 'react-icons/vsc'
import {MdDelete} from 'react-icons/md'
import {BsPieChart} from 'react-icons/bs'
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
  const [selectedData, setSelectedData] = useState(null);
  return (
    <div className="data-table">
      <div className="table-responsive">
        <table className="scrollable-table">
          <thead className="sticky-header">
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

                    {/* Start Fetching Button */}
                    <button onClick={() => startFetching(data)}>
                    <VscDebugStart/>
                    </button>

                    {/* All Charts Button */}
                    <button
                      style={{ backgroundColor: "#cacf42" }}
                      onClick={() => {
                        setSelectedData(data);  // This sets the data of the clicked row
                        setShowModal(true);
                      }}
                    >
                      <BsPieChart/>
                    </button>
                    {/* Delete Row Button */}
                    <button
                      style={{ backgroundColor: "#cf424b" }}
                      onClick={() => deleteSavedData(index)}
                    >
                      <MdDelete/>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <MonthlyChart data={selectedData} showModal={showModal} handleClose={handleClose} />
    </div>
  );
}

export default DataTable;
