import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import * as userTypes from '../../user/UserTypes';

const TeacherOperationsButton = ({ patient }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/doctor-pt-operations', { state: { patient: patient, role: userTypes.TEACHER } });
  };

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={handleButtonClick}
      >
        Öğretmen İşlemleri
      </Button>
    </div>
  );
};

export default TeacherOperationsButton;
