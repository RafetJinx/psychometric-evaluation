import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import user types
import * as userTypes from '../../user/UserTypes';

// action imports
import * as userActions from '../../../redux/actions/userActions';
import * as testActions from '../../../redux/actions/testActions/testActions';
import * as ptSpesificUserTestActions from '../../../redux/actions/testActions/ptSpesificUserTestActions'

import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import UserDropdown from '../../user/UserDropdown';
import ShowPTTestResultButton from '../../relatedPatients/buttons/testResults/ShowPTTestResultButton';

// import * as userTypes from '../../user/UserTypes';

function PTTestResults(props) {
  const { actions, user, patient, role, solvedDetailedTests, solvedTests, unsolvedTests } = props;

  const [isLoadingTestRole, setIsLoadingTestRole] = useState(true);

  const [isLoadingSolvedDetailedTests, setIsLoadingSolvedDetailedTests] = useState(true);
  const [isLoadingCanSolvedTests, setIsLoadingSolvedTests] = useState(true);
  const [isLoadingUnUnsolvedTests, setIsLoadingUnsolvedTests] = useState(true);



  useEffect(() => {
    actions.getUserRole(user.id)
      .then(() => {
        setIsLoadingTestRole(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingTestRole(false);
      })


  }, [actions, role, user, patient]);

  useEffect(() => {
    // solved detailed tests section
    if (!isLoadingTestRole) {
      if (role.toUpperCase() === userTypes.PARENT) {
        actions.getSolvedTestDetailByParentIdAndPatientId(user.id, patient.id)
          .then(() => {
            setIsLoadingSolvedDetailedTests(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoadingSolvedDetailedTests(false);
          })
      } else if (role.toUpperCase() === userTypes.TEACHER) {
        actions.getSolvedTestDetailByTeacherIdAndPatientId(user.id, patient.id)
          .then(() => {
            setIsLoadingSolvedDetailedTests(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoadingSolvedDetailedTests(false);
          })
      }


      // solved test section
      if (role.toUpperCase() === userTypes.PARENT) {
        actions.getSolvedTestAssignedToParentByParentIdWithPatientId(user.id, patient.id)
          .then(() => {
            setIsLoadingSolvedTests(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoadingSolvedTests(false);
          })
      } else if (role.toUpperCase() === userTypes.TEACHER) {
        actions.getSolvedTestAssignedToTeacherByTeacherIdWithPatientId(user.id, patient.id)
          .then(() => {
            setIsLoadingSolvedTests(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoadingSolvedTests(false);
          })
      }


      // unsolved test section
      if (role.toUpperCase() === userTypes.PARENT) {
        actions.getUnsolvedTestAssignedToParentByParentIdWithPatientId(user.id, patient.id)
          .then(() => {
            setIsLoadingUnsolvedTests(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoadingUnsolvedTests(false);
          })
      } else if (role.toUpperCase() === userTypes.TEACHER) {
        actions.getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(user.id, patient.id)
          .then(() => {
            setIsLoadingUnsolvedTests(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoadingUnsolvedTests(false);
          })
      }
    }
  }, [actions, isLoadingTestRole, patient.id, role, user.id])


  let userInformationContent;
  if (role && role.toUpperCase() === userTypes.PARENT) {
    userInformationContent = (
      <div>
        {/* Parent Detail Container */}
        <Container>
          <Row>
            <Col xs='12'>
              <div className='ui black huge labels'>
                <div className='ui label'>Ebeveyn Bilgileri</div>
              </div>
            </Col>
          </Row>

          <Container>
            <Row>
              <Col xs='auto'>
                <div className='ui blue huge labels'>
                  <div className='ui label'>Adı: {user.name}</div>
                </div>
              </Col>

              <Col xs='auto'>
                <div className='ui blue huge labels'>
                  <div className='ui label'>Soyadı: {user.surname}</div>
                </div>
              </Col>

              <Col xs='auto'>
                <div className='ui blue huge labels'>
                  <div className='ui label'>Numarası: {user.id}</div>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
  else if (role && role.toUpperCase() === userTypes.TEACHER) {
    userInformationContent = (
      <div>
        {/* Parent Detail Container */}
        <Container>
          <Row>
            <Col xs='12'>
              <div className='ui black huge labels'>
                <div className='ui label'>Öğretmen Bilgileri</div>
              </div>
            </Col>
          </Row>

          <Container>
            <Row>
              <Col xs='auto'>
                <div className='ui blue huge labels'>
                  <div className='ui label'>Adı: {user.name}</div>
                </div>
              </Col>

              <Col xs='auto'>
                <div className='ui blue huge labels'>
                  <div className='ui label'>Soyadı: {user.surname}</div>
                </div>
              </Col>

              <Col xs='auto'>
                <div className='ui blue huge labels'>
                  <div className='ui label'>Numarası: {user.id}</div>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }


  if (isLoadingTestRole && isLoadingSolvedDetailedTests &&
    isLoadingCanSolvedTests && isLoadingUnUnsolvedTests) {
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

      {userInformationContent}
      <br />
      <br />


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
            <Col xs='auto'>
              <div className='ui blue huge labels'>
                <div className='ui label'>Adı: {patient.name}</div>
              </div>
            </Col>

            <Col xs='auto'>
              <div className='ui blue huge labels'>
                <div className='ui label'>Soyadı: {patient.surname}</div>
              </div>
            </Col>

            <Col xs='auto'>
              <div className='ui blue huge labels'>
                <div className='ui label'>Numarası: {patient.id}</div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <br />
      <br />

      {/* Solved Tests Container */}
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
                    <td><ShowPTTestResultButton user={user} patient={patient} test={solvedTest} solvedAt={solvedAt} /></td>
                  </tr>
                )
              })
            }
          </tbody>

        </Table>
      </Container>
      <br />
      <br />

      {/* Unsolved Tests Container */}
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
    // role
    role: state.userReducer.role,

    // solved detailed tests
    solvedDetailedTests: state.ptSpesificUserTestReducer.solvedDetailedTests,

    // solved tests
    solvedTests: state.ptSpesificUserTestReducer.spesificRelatedPatientSolvedAssignedTests,

    // unsolved tests
    unsolvedTests: state.ptSpesificUserTestReducer.spesificRelatedPatientUnsolvedAssignedTests,

    // base user id
    doctorId: state.authReducer.userId,
  };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions, ...testActions, ...ptSpesificUserTestActions }, dispatch),
  };
}

const ConnectedPTTestResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(PTTestResults);

export default function TestOperationsClass() {
  const location = useLocation();
  const { user, patient } = location.state;

  return <ConnectedPTTestResults patient={patient} user={user} />;
}