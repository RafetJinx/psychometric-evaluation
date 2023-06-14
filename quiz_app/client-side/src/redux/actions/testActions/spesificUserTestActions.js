import * as actionTypes from '../actionTypes';

export function getUnsolvedTestByPatientId(patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/patienttests/getUnsolvedTestInfosByPatientId?patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setUnsolvedTestsByPatientId(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getSolvedTestByPatientId(patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/patienttests/getSolvedTestInfosByPatientId?patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setSolvedTestsByPatientId(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getSolvedTestDetailByPatientId(patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/patienttests/getSolvedTestDetailByPatientId?patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setSolvedDetailedTestsByPatientId(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getUnsolvedTestDetailByPatientId(patientId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/patienttests/getUnsolvedTestDetailByPatientId?patientId=${patientId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.success === true) {
                dispatch(setUnsolvedDetailedTestsByPatientId(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function deleteTestFromPatient(patientId, testId, addedAt) {
    return async function (dispatch) {
        const addedAtParams = addedAt.map(value => `addedAt=${value}`).join('&');
        const url = `http://localhost:8080/api/patienttests/deleteUnsolvedTestFromPatient?${addedAtParams}&patientId=${patientId}&testId=${testId}`;

        try {
            await fetch(url, {
                method: 'DELETE'
            });
        } catch (error) {
            throw error;
        }
    };
}

export function addTestToPatient(patientId, testId) {
    return async function (dispatch) {
        const url = `http://localhost:8080/api/patienttests/${patientId}/tests?testId=${testId}`;

        try {
            await fetch(url, {
                method: 'POST'
            });
        } catch (error) {
            throw error;
        }
    };
}

function setUnsolvedTestsByPatientId(unsolvedAssignedTests) {
    return {
        type: actionTypes.SET_UNSOLVED_ASSIGNED_TESTS,
        payload: unsolvedAssignedTests
    }
}

function setSolvedTestsByPatientId(solvedAssignedTests) {
    return {
        type: actionTypes.SET_SOLVED_ASSIGNED_TESTS,
        payload: solvedAssignedTests
    }
}

function setSolvedDetailedTestsByPatientId(solvedDetailedTests) {
    return {
        type: actionTypes.SET_SOLVED_DETAILED_ASSIGNED_TESTS,
        payload: solvedDetailedTests
    }
}

function setUnsolvedDetailedTestsByPatientId(unsolvedDetailedTests) {
    return {
        type: actionTypes.SET_UNSOLVED_DETAILED_ASSIGNED_TESTS,
        payload: unsolvedDetailedTests
    }
}


