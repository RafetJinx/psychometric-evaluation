import * as actionTypes from '../actionTypes';

export function getSolvedTestAssignedToParentByParentIdWithPatientId(parentId, patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/parenttests/getSolvedTestAssignedToParentByParentIdWithPatientId?parentId=${parentId}&patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setRelatedPatientSolvedAssignedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getUnsolvedTestAssignedToParentByParentIdWithPatientId(parentId, patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/parenttests/getUnsolvedTestAssignedToParentByParentIdWithPatientId?parentId=${parentId}&patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setRelatedPatientUnsolvedAssignedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getSolvedTestAssignedToTeacherByTeacherIdWithPatientId(teacherId, patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/teachertests/getSolvedTestAssignedToTeacherByTeacherIdWithPatientId?patientId=${patientId}&teacherId=${teacherId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setRelatedPatientSolvedAssignedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(teacherId, patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/teachertests/getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId?patientId=${patientId}&teacherId=${teacherId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setRelatedPatientUnsolvedAssignedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getSolvedTestDetailByParentIdAndPatientId(parentId, patientId){
    return async function (dispatch) {
        let url = `http://localhost:8080/api/parenttests/getSolvedTestDetailByParentIdAndPatientId?parentId=${parentId}&patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setSolvedDetailedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getSolvedTestDetailByTeacherIdAndPatientId(teacherId, patientId){
    return async function (dispatch) {
        let url = `http://localhost:8080/api/teachertests/getSolvedTestDetailByTeacherIdAndPatientId?teacherId=${teacherId}&patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setSolvedDetailedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getUnsolvedTestDetailByParentIdAndPatientId(parentId, patientId){
    return async function (dispatch) {
        let url = `http://localhost:8080/api/parenttests/getUnsolvedTestDetailByParentIdAndPatientId?parentId=${parentId}&patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setUnsolvedDetailedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getUnsolvedTestDetailByTeacherIdAndPatientId(teacherId, patientId){
    return async function (dispatch) {
        let url = `http://localhost:8080/api/teachertests/getUnsolvedTestDetailByTeacherIdAndPatientId?teacherId=${teacherId}&patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setUnsolvedDetailedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

function setRelatedPatientSolvedAssignedTests(data) {
    return {
        type: actionTypes.SET_RELATED_PATIENT_SOLVED_ASSIGNED_TESTS,
        payload: data
    }
}

function setRelatedPatientUnsolvedAssignedTests(data) {
    return {
        type: actionTypes.SET_RELATED_PATIENT_UNSOLVED_ASSIGNED_TESTS,
        payload: data
    }
}

function setSolvedDetailedTests(solvedDetailedTests) {
    return {
        type: actionTypes.SET_SOLVED_DETAILED_ASSIGNED_TESTS,
        payload: solvedDetailedTests
    }
}

function setUnsolvedDetailedTests(unsolvedDetailedTests) {
    return {
        type: actionTypes.SET_UNSOLVED_DETAILED_ASSIGNED_TESTS,
        payload: unsolvedDetailedTests
    }
}

