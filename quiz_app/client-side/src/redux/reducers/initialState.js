// eslint-disable-next-line import/no-anonymous-default-export
const initialState = {
    // user authenticate
    isAuthenticated: false,

    // user information
    userId: null,
    role: null,
    email: null,
    name: null,
    surname: null,
    userFullName: null,

    // patient diagnoses
    diagnoses: [],

    // tests
    testDetail: null,
    tests: [],

    // patient -> test panel && parent/teacher -> spesific patient test panel
    assignedTests: [],
    unsolvedAssignedTests: [],
    solvedAssignedTests: [],
    solvedDetailedTests: [],
    unsolvedDetailedTests: [],

    // parent/teacher -> test panel
    selectedPatient: null,

    // related patient/parent/teacher data
    relatedParents: [],
    relatedPatients: [],
    relatedTeachers: [],


    // related patient test lists
    relatedPatientsAssignedTests: [],
    relatedPatientsUnsolvedAssignedTests: [],
    relatedPatientsSolvedAssignedTests: [],


    // spesific related patient test details
    spesificRelatedPatientUnsolvedAssignedTests: [],
    spesificRelatedPatientSolvedAssignedTests: [],

    // error
    error: null
}

export default initialState;