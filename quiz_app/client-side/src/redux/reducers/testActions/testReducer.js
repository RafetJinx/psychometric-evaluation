import initialState from '../initialState';
import * as actionTypes from '../../actions/actionTypes';

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_TESTS:
            return {
                ...state,
                tests: action.payload
            }

        case actionTypes.SET_TEST:
            return {
                ...state,
                testDetail: action.payload
            }

        default:
            return state;
    }
}