import initialState from "../initialState";
import * as actionTypes from "../../actions/actionTypes";

export default function relatedTeacherReducer(state = initialState, action){
    switch (action.type) {
        case actionTypes.SET_RELATED_TEACHERS:
            return {
                ...state,
                relatedTeachers: action.payload
            }            
    
        default:
            return state;
    }
}