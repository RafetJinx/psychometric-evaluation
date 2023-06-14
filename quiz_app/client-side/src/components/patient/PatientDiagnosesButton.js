import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const PatientDiagnosesButton = () => {
    return (
        <div className="d-flex p-5">
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/diagnoses"
            >
                Tanılarım
            </Button>
        </div>
    );
};

export default PatientDiagnosesButton;
