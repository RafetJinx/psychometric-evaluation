import React from 'react';
import { Button } from '@mui/material';

const AddTestToPatientButton = ({ test, onAddTest }) => {
  // const navigate = useNavigate();

  const handleButtonClick = () => {
    onAddTest();
  };

  return (
    <div>
      <Button 
        variant='contained'
        color='primary'
        onClick={handleButtonClick}
      >
        Testi Ekle
      </Button>
    </div>
  );
};

export default AddTestToPatientButton;
