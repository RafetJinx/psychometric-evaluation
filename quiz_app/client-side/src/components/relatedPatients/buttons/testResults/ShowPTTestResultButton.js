import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ShowPTTestResultButton = ({ user, patient, test, solvedAt }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/pt-test-result', { state: { user: user, patient: patient, test: test, solvedAt: solvedAt} });
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

export default ShowPTTestResultButton;
