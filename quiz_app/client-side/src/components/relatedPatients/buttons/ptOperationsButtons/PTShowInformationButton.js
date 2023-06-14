import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PTShowInformationButton = ({ user, patient }) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/doctor-pt-show-operations', { state: { user: user, patient: patient } });
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

export default PTShowInformationButton;
