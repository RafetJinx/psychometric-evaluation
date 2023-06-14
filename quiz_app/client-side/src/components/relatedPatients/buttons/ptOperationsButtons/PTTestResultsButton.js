import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const PTTestResultsButton = ({ user, patient }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/pt-test-results', { state: { user: user, patient: patient } });
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

export default PTTestResultsButton;
