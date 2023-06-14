import * as actionTypes from './actionTypes';

export function getUserId() {
    return async function (dispatch, getState) {
        const userId = getState().userId;
        return userId;
    };
}

export function getUserIdAndRole() {
    return async function (dispatch, getState) {
        const userId = getState().userId;
        const role = getState().role;
        return { userId, role };
    };
}

export function getUserRole(userId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/users/getUserRole?userId=${userId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setUserRole(result.data));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function GetUserFullName(userId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/users/getUserNameAndSurnameByUserId?userId=${userId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(setUserFullNameSuccess(`${result.data.name} ${result.data.surname}`));
            }
        } catch (error) {
            throw error;
        }
    };
}

export function getUserInfo(userId) {
    return async function (dispatch) {
        let url = `http://localhost:8080/api/users/getUserInfoByUserId?userId=${userId}`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.success === true) {
                dispatch(
                    setUserInfo(
                        result.data.id,
                        result.data.role,
                        result.data.email,
                        result.data.name,
                        result.data.surname
                    )
                );
            }
        } catch (error) {
            throw error;
        }
    };
}

export function clearState() {
    return {
        type: actionTypes.CLEAR_STATE,
    };
}

function setUserRole(role) {
    return {
        type: actionTypes.SET_USER_ROLE,
        payload: role,
    };
}

function setUserFullNameSuccess(userFullName) {
    return {
        type: actionTypes.SET_USER_FULL_NAME,
        payload: userFullName,
    };
}

function setUserInfo(userId, role, email, name, surname) {
    return {
        type: actionTypes.SET_USER_INFO,
        payload: {
            userId,
            role,
            email,
            name,
            surname,
        },
    };
}
