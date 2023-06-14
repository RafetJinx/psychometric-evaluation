import * as actionTypes from '../actionTypes';

export function getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId(patientId) {
    return async function (dispatch) {
        try {
            const url = `http://localhost:8080/api/patientRelatedTeachersController/getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId?patientId=${patientId}`;
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setRelatedTeachers(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
};

function setRelatedTeachers(data) {
    return {
        type: actionTypes.SET_RELATED_TEACHERS,
        payload: data
    };
};