import React from 'react';
import { Button } from '@mui/material';

const DeleteTestFromPatientButton = ({ test, onDeleteTest }) => {
  const handleButtonClick = () => {
    onDeleteTest(); // onDeleteTest fonksiyonunu çağır
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
      >
        Testi Sil
      </Button>
    </div>
  );
};

export default DeleteTestFromPatientButton;
