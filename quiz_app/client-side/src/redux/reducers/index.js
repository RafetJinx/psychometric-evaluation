import { combineReducers } from 'redux';
import authReducer from './authReducer'
import userReducer from './userReducer';
import diagnoseReducer from './diagnoseReducer';

// related patient/parent/teacher reducers
import relatedParentReducer from './relatedReducers/relatedParentReducer';
import relatedPatientReducer from './relatedReducers/relatedPatientReducer';
import relatedTeacherReducer from './relatedReducers/relatedTeacherReducer';


// test reducers
import testReducer from './testActions/testReducer';
import spesificUserTestReducer from './testActions/spesificUserTestReducer';
import parentTeacherTestReducer from './testActions/parentTeacherTestReducer';
import ptSpesificUserTestReducer from './testActions/ptSpesificUserTestReducer';

const rootReducer = combineReducers({
    // Auth Reducer
    authReducer: authReducer,

    // User Reducer
    userReducer: userReducer,

    // Related Patient/Parent/Teacher Reducer
    relatedParentReducer: relatedParentReducer,
    relatedPatientReducer: relatedPatientReducer,
    relatedTeacherReducer: relatedTeacherReducer,

    // Diagnose Reducer (For Patient)
    diagnoseReducer: diagnoseReducer,

    // Test Reducers
    testReducer: testReducer,
    spesificUserTestReducer: spesificUserTestReducer,
    parentTeacherTestReducer: parentTeacherTestReducer,

    // Spesific Test Reducers
    ptSpesificUserTestReducer: ptSpesificUserTestReducer

});

export default rootReducer;