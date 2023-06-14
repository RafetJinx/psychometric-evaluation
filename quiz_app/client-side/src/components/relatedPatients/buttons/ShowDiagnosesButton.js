import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowDiagnosesButton = ({ patient }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/show-patient-diagnoses', {state: {patient: patient}});
  };

  return (
    <div>
      <Button 
        variant='contained'
        color='primary'
        onClick={handleButtonClick}
      >
        Tanılar
      </Button>
    </div>
  );
};

export default ShowDiagnosesButton;
