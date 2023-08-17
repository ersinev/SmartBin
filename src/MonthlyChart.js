// MonthlyChart.js
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const MonthlyChart = ({ showModal, handleClose }) => {
  // Add your Monthly Chart page content here
  return (
    <Modal show={showModal} onHide={handleClose} size='lg' centered className='custom-modal'>
    <Modal.Header closeButton>
      <Modal.Title>Monthly Chart</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {/* Your chart or other content goes here */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  );
};

export default MonthlyChart;
