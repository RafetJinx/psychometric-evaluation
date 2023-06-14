import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// action imports
import * as spesificUserTestActions from '../../../redux/actions/testActions/spesificUserTestActions';

import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import UserDropdown from '../../user/UserDropdown';
import ShowPatientTestResultButton from '../../relatedPatients/buttons/testResults/ShowPatientTestResultButton';


function PatientTestResults(props) {
  const { actions, patient, solvedTests, solvedDetailedTests, unsolvedTests } = props;
  const [isLoadingSolvedTests, setIsLoadingSolvedTests] = useState(true);
  const [isLoadingDetailedSolvedTests, setIsLoadingDetailedSolvedTests] = useState(true);
  const [isLoadingUnsolvedTests, setIsLoadingUnsolvedTests] = useState(true);

  useEffect(() => {
    // getting solved tests 
    actions.getSolvedTestByPatientId(patient.id)
      .then(() => {
        setIsLoadingSolvedTests(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingSolvedTests(false);
      })

    // getting unsolved tests 
    actions.getUnsolvedTestByPatientId(patient.id)
      .then(() => {
        setIsLoadingUnsolvedTests(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingUnsolvedTests(false);
      })

    actions.getSolvedTestDetailByPatientId(patient.id)
      .then(() => {
        setIsLoadingDetailedSolvedTests(false)
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingDetailedSolvedTests(false);
      })
  }, [actions, patient]);

  if (isLoadingSolvedTests && isLoadingUnsolvedTests && isLoadingDetailedSolvedTests) {
    return (
      <div>
        Loading...
      </div>
    );
  }



  return (
    <div>
      {/* Base User Dropdown Container */}
      <Container>
        <Row>
          <Col xs='12'>
            <UserDropdown />
          </Col>
        </Row>
      </Container>

      {/* Patient Detail Container */}
      <Container>
        <Row>
          <Col xs='12'>
            <div className='ui black huge labels'>
              <div className='ui label'>Hasta Bilgileri</div>
            </div>
          </Col>
        </Row>

        <Container>
          <Row>
            <Col xs='12'>
              <div className='ui blue huge labels'>
                <div className='ui label'>Adı: {patient.name}</div>
              </div>
            </Col>

            <Col xs='12'>
              <div className='ui blue huge labels'>
                <div className='ui label'>Soyadı: {patient.surname}</div>
              </div>
            </Col>

            <Col xs='12'>
              <div className='ui blue huge labels'>
                <div className='ui label'>Numarası: {patient.id}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <br />
      <br />

      {/* Display Solved Tests Container */}
      <Container>
        <div className='ui black huge labels'>
          <div className='ui label'>Çözülen Testler</div>
        </div>

        <Table hover bordered responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Test Kodu</th>
              <th>Test Adı</th>
              <th>Çözülme Tarihi</th>
              <th>Sonuç Görüntüle</th>
            </tr>
          </thead>

          <tbody>
            {
              solvedTests && solvedDetailedTests && solvedTests.map((solvedTest, index) => {
                const counter = index + 1;
                let solvedAt = solvedDetailedTests[index].solvedAt;
                return (
                  <tr key={counter}>
                    <th scope='row'>{counter}</th>
                    <td>{solvedTest.testCode}</td>
                    <td>{solvedTest.name}</td>
                    <td>
                      {"Tarih : " + solvedAt[2] + "." + solvedAt[1] + "." + solvedAt[0]}
                      <br />
                      {"Saat : " + solvedAt[3] + ":" + solvedAt[4]}
                    </td>
                    <td><ShowPatientTestResultButton patient={patient} test={solvedTest} solvedAt={solvedAt} /></td>
                  </tr>
                )
              })
            }
          </tbody>

        </Table>
      </Container>
      <br />
      <br />

      {/* Display Unsolved Tests Container */}
      <Container>
        <div className='ui black huge labels'>
          <div className='ui label'>Çözülmemiş Testler</div>
        </div>

        <Table hover bordered responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Test Kodu</th>
              <th>Test Adı</th>
            </tr>
          </thead>

          <tbody>
            {
              unsolvedTests && unsolvedTests.map((unsolvedTest, index) => {
                const counter = index + 1;

                return (
                  <tr key={counter}>
                    <th scope='row'>{counter}</th>
                    <td>
                      {unsolvedTest.testCode}
                    </td>
                    <td>
                      {unsolvedTest.name}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </Table>
      </Container>




    </div>
  );
}

// getting props
function mapStateToProps(state) {
  return {
    solvedTests: state.spesificUserTestReducer.solvedAssignedTests,

    unsolvedTests: state.spesificUserTestReducer.unsolvedAssignedTests,

    solvedDetailedTests: state.spesificUserTestReducer.solvedDetailedTests,

    // base user id
    doctorId: state.authReducer.userId,
  };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...spesificUserTestActions }, dispatch),
  };
}

const ConnectedPatientTestResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientTestResults);

export default function TestOperationsClass() {
  const location = useLocation();
  const { patient } = location.state;

  return <ConnectedPatientTestResults patient={patient} />;
}