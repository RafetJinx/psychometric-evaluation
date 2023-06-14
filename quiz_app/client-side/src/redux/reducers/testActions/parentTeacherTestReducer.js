import initialState from "../initialState";
import * as actionTypes from "../../actions/actionTypes";

export default function parentTeacherTestReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_RELATED_PATIENTS_SOLVED_ASSIGNED_TESTS:
            return {
                ...state,
                relatedPatientsSolvedAssignedTests: action.payload
            }

        case actionTypes.SET_RELATED_PATIENTS_UNSOLVED_ASSIGNED_TESTS:
            return {
                ...state,
                relatedPatientsUnsolvedAssignedTests: action.payload
            }

        default:
            return state;
    }
}