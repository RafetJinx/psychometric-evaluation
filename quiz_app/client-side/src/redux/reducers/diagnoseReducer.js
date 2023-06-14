import initialState from "./initialState";
import * as actionTypes from "../actions/actionTypes";

export default function diagnoseReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_DIAGNOSES:
            return {
                ...state,
                diagnoses: action.payload
            }
        default:
            return state;
    }
}