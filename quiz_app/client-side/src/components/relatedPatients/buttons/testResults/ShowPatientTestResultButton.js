import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowPatientTestResultButton = ({ patient, test, solvedAt }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/patient-test-result', { state: { patient: patient, test: test, solvedAt: solvedAt } });
    };

    return (
        <div>
            <Button
                variant='contained'
                color='primary'
                onClick={handleButtonClick}
            >
                Görüntüle
            </Button>
        </div>
    );
};

export default ShowPatientTestResultButton;
