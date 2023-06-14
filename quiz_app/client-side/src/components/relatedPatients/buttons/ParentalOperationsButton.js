import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import * as userTypes from '../../user/UserTypes';

const ParentalOperationsButton = ({ patient }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/doctor-pt-operations', {state: {patient: patient, role: userTypes.PARENT}});
  };

  return (
    <div>
      <Button 
        variant='contained'
        color='primary'
        onClick={handleButtonClick}
      >
        Ebeveyn İşlemleri
      </Button>
    </div>
  );
};

export default ParentalOperationsButton;
