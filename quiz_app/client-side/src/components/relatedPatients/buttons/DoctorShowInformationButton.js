import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DoctorShowInformationButton = ({ patient }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/doctor-show-information', {state: {patient: patient}});
  };

  return (
    <div>
      <Button 
        variant='contained'
        color='primary'
        onClick={handleButtonClick}
      >
        Bilgilerini Görüntüle
      </Button>
    </div>
  );
};

export default DoctorShowInformationButton;
