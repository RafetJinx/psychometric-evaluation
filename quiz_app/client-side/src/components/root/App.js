import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import LoginLayout from '../login/LoginLayout';
import AdminLayout from '../admin/AdminLayout';
import DoctorLayout from '../doctor/DoctorLayout';
import ParentLayout from '../parent/ParentLayout';
import PatientLayout from '../patient/PatientLayout';
import TeacherLayout from '../teacher/TeacherLayout';
import Diagnoses from '../patient/Diagnoses';
import ShowInformation from '../user/ShowInformation';
import PTTestOperations from '../relatedPatients/PTTestOperations';

import PatientTestResult from '../doctor/testResults/PatientTestResult';
import PatientTestResults from '../doctor/testResults/PatientTestResults';

import PTTestResult from '../doctor/testResults/PTTestResult';
import PTTestResults from '../doctor/testResults/PTTestResults';

// Doctor Pages - informations
import DoctorShowInformation from '../doctor/informations/DoctorShowInformation';
import ShowPatientDiagnoses from '../doctor/informations/ShowPatientDiagnoses';
import TestOperations from '../doctor/operations/TestOperations';
    // ptInformations
import DoctorShowInformations from '../doctor/informations/ptInformations/ShowInformations';

// Doctor Pages - operations
import PTOperations from '../doctor/operations/PTOperations';
import DoctorPTTestOperations from '../doctor/operations/PTTestOperations';


// User Types
import * as userTypes from '../user/UserTypes'

// semantic-ui-react imports
import { Container } from 'semantic-ui-react';

function App() {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  const role = useSelector(state => state.authReducer.role);

  return (
    <div>
      <Container>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginLayout />} />

          {isAuthenticated ? (
            <>
              <Route path="/admin-dashboard" element={<AdminLayout />} />
              <Route path="/doctor-dashboard" element={<DoctorLayout />} />
              <Route path="/parent-dashboard" element={<ParentLayout />} />
              <Route path="/patient-dashboard" element={<PatientLayout />} />
              <Route path="/teacher-dashboard" element={<TeacherLayout />} />
              <Route path="/show-information" element={<ShowInformation />} />

              {role.toUpperCase() === userTypes.PATIENT && (
                <Route path="/diagnoses" element={<Diagnoses />} />
              )}

              {(role.toUpperCase() === userTypes.PARENT || role.toUpperCase() === userTypes.TEACHER) && (
                <React.Fragment>
                  <Route path="/pt-test-operations" element={<PTTestOperations />} />
                </React.Fragment>
              )}

              {role.toUpperCase() === userTypes.DOCTOR && (
                <React.Fragment>
                  <Route path="/doctor-show-information" element={<DoctorShowInformation />} />
                  <Route path="/doctor-pt-operations" element={<PTOperations />} />
                  <Route path="/doctor-test-operations" element={<TestOperations />} />
                  <Route path="/patient-test-results" element={<PatientTestResults />} />
                  <Route path="/show-patient-diagnoses" element={<ShowPatientDiagnoses />} />

                  <Route path="/patient-test-result" element={<PatientTestResult />} />

                  {/* Parent/Teacher Routes */}
                  <Route path="/doctor-pt-show-operations" element={<DoctorShowInformations />} />
                  <Route path="/doctor-pt-test-operations" element={<DoctorPTTestOperations />} />
                  <Route path="/pt-test-results" element={<PTTestResults />} />

                  <Route path="/pt-test-result" element={<PTTestResult />} />

                </React.Fragment>
              )}
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
