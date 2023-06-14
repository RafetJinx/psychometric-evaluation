import initialState from "../initialState";
import * as actionTypes from "../../actions/actionTypes";

export default function spesificUserTestReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_UNSOLVED_ASSIGNED_TESTS:
            return {
                ...state,
                unsolvedAssignedTests: action.payload

            }

        case actionTypes.SET_SOLVED_ASSIGNED_TESTS:
            return {
                ...state,
                solvedAssignedTests: action.payload
            }

        case actionTypes.SET_SOLVED_DETAILED_ASSIGNED_TESTS:
            return {
                ...state,
                solvedDetailedTests: action.payload
            }

        case actionTypes.SET_UNSOLVED_DETAILED_ASSIGNED_TESTS:
            return {
                ...state,
                unsolvedDetailedTests: action.payload
            }

        default:
            return state;
    }
}