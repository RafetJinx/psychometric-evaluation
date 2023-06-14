import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TestOperationsButton = ({ patient }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/pt-test-operations', {state: {patient: patient}});
  };

  return (
    <div>
      <Button 
        variant='contained'
        color='primary'
        onClick={handleButtonClick}
      >
        Test İşlemleri
      </Button>
    </div>
  );
};

export default TestOperationsButton;
