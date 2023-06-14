import * as actionTypes from "../actionTypes";

export function getSolvedTestsAssignedToParentByParentId(parentId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/parenttests/getSolvedTestsAssignedToParentByParentId?parentId=${parentId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setSolvedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getUnsolvedTestsAssignedToParentByParentId(parentId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/parenttests/getUnsolvedTestsAssignedToParentByParentId?parentId=${parentId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setUnsolvedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getSolvedTestsAssignedToTeacherByTeacherId(teacherId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/teachertests/getSolvedTestsAssignedToTeacherByTeacherId?teacherId=${teacherId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setSolvedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

export function getUnsolvedTestsAssignedToTeacherByTeacherId(teacherId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/teachertests/getUnsolvedTestsAssignedToTeacherByTeacherId?teacherId=${teacherId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setUnsolvedTests(result.data));
            }
        } catch (error) {
            throw error;
        }
    }
}

function setSolvedTests(data) {
    return {
        type: actionTypes.SET_RELATED_PATIENTS_SOLVED_ASSIGNED_TESTS,
        payload: data
    }
}

function setUnsolvedTests(data) {
    return {
        type: actionTypes.SET_RELATED_PATIENTS_UNSOLVED_ASSIGNED_TESTS,
        payload: data
    }
}
