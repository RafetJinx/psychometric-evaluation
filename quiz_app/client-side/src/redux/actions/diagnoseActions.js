import * as actionTypes from './actionTypes';

export function getDiagnoses(patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/patients/getPatientDiagnosesByPatientId?patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setDiagnosesToState(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

function setDiagnosesToState(diagnoses) {
    return {
        type: actionTypes.SET_DIAGNOSES,
        payload: diagnoses
    };
}
