import initialState from "../initialState";
import * as actionTypes from "../../actions/actionTypes";

export default function relatedParentReducer(state = initialState, action){
    switch (action.type) {
        case actionTypes.SET_RELATED_PARENTS:
            return {
                ...state,
                relatedParents: action.payload
            }            
    
        default:
            return state;
    }
}