import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes"

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                error: null,
                userId: action.payload.userId,
                role: action.payload.role
            };
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload,
                userId: null,
                role: null
            };
        default:
            return state;
    }
}