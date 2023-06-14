import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.CLEAR_STATE:
            return initialState;

        case actionTypes.SET_USER_ROLE:
            return {
                ...state,
                role: action.payload
            };

        case actionTypes.SET_USER_FULL_NAME:
            return {
                ...state,
                userFullName: action.payload
            };

        case actionTypes.SET_USER_INFO:
            return {
                ...state,
                userId: action.payload.userId,
                role: action.payload.role,
                email: action.payload.email,
                name: action.payload.name,
                surname: action.payload.surname
            }

        default:
            return state;

    }
}