import * as actionTypes from '../actionTypes';

export function getRelatedParentNameAndSurnameAndParentNumberByPatientId(patientId) {
    return async function (dispatch) {
        try {
            const url = `http://localhost:8080/api/patientRelatedParentsController/getRelatedParentNameAndSurnameAndParentNumberByPatientId?patientId=${patientId}`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setRelatedParents(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
};

function setRelatedParents(data) {
    return {
        type: actionTypes.SET_RELATED_PARENTS,
        payload: data
    };
};