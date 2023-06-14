import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PTTestOperationsButton = ({ user, patient }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/doctor-pt-test-operations', { state: { user: user, patient: patient } });
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

export default PTTestOperationsButton;
