import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SpesificPateintTestResultsButton = ({ patient }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/patient-test-results', { state: { patient: patient } });
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={handleButtonClick}
      >
        Test Sonuçları
      </Button>
    </div>
  );
};

export default SpesificPateintTestResultsButton;
