import * as actionTypes from '../actionTypes';

export function getPatientCanSolveTests() {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/tests/getPatientCanSolveTests`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getParentCanSolveTests() {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/tests/getParentCanSolveTests`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getTeacherCanSolveTests() {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/tests/getTeacherCanSolveTests`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getSpesificTestDetail(testId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/tests/getTestById?testId=${testId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setTest(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

function setTests(tests) {
    return {
        type: actionTypes.SET_TESTS,
        payload: tests
    }
}

function setTest(testDetail) {
    return {
        type: actionTypes.SET_TEST,
        payload: testDetail
    }
}
