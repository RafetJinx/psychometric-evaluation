import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// action imports
import * as testActions from '../../../redux/actions/testActions/testActions';
import * as spesificUserTestActions from '../../../redux/actions/testActions/spesificUserTestActions';

import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import UserDropdown from '../../user/UserDropdown';
import AddTestToPatientButton from '../../relatedPatients/buttons/testButtons/AddTestToPatientButton';
import DeleteTestFromPatientButton from '../../relatedPatients/buttons/testButtons/DeleteTestFromPatientButton';

// import * as userTypes from '../../user/UserTypes';

function TestOperations(props) {
  const { actions, patient, tests, unsolvedTests, unsolvedDetailedTests } = props;
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);
  const [isLoadingUnsolvedTests, setIsLoadingUnsolvedTests] = useState(true);
  const [isLoadingDetailedUnsolvedTests, setIsLoadingDetailedUnsolvedTests] = useState(true);

  const handleDeleteTest = async (testId, addedAt) => {
    try {
      setIsLoadingUnsolvedTests(true);
      setIsLoadingDetailedUnsolvedTests(true);

      await actions.deleteTestFromPatient(patient.id, testId, addedAt);
      // Silme işleminden sonra unsolvedTests dizisinin güncellenip güncellenmediğini kontrol edin
      await actions.getUnsolvedTestByPatientId(patient.id);
      setIsLoadingUnsolvedTests(false);

      await actions.getUnsolvedTestDetailByPatientId(patient.id);
      setIsLoadingDetailedUnsolvedTests(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTest = async (testId) => {
    try {
      setIsLoadingUnsolvedTests(true);
      setIsLoadingDetailedUnsolvedTests(true);

      await actions.addTestToPatient(patient.id, testId);

      await actions.getUnsolvedTestByPatientId(patient.id);
      setIsLoadingUnsolvedTests(false);

      await actions.getUnsolvedTestDetailByPatientId(patient.id);
      setIsLoadingDetailedUnsolvedTests(false);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // getting patient can solve tests
    actions.getPatientCanSolveTests()
      .then(() => {
        setIsLoadingUserInfo(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingUserInfo(false);
      })

    // getting unsolved tests
    actions.getUnsolvedTestByPatientId(patient.id)
      .then(() => {
        setIsLoadingUnsolvedTests(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingUnsolvedTests(false);
      })

    // getting unsolved detailed tests
    actions.getUnsolvedTestDetailByPatientId(patient.id)
      .then(() => {
        setIsLoadingDetailedUnsolvedTests(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingDetailedUnsolvedTests(false);
      })
  }, [actions, patient]);

  if (isLoadingUserInfo && isLoadingUnsolvedTests && isLoadingDetailedUnsolvedTests) {
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

      {/* Add Test Container */}
      <Container>
        <div className='ui black huge labels'>
          <div className='ui label'>Test Ekle</div>
        </div>

        <Table hover bordered responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Test Kodu</th>
              <th>Test Adı</th>
              <th>Testi Ekle</th>
            </tr>
          </thead>

          <tbody>
            {
              tests && tests.map((test, index) => {
                const counter = index + 1;

                return (
                  <tr key={counter}>
                    <th scope='row'>{counter}</th>
                    <td>
                      {test.testCode}
                    </td>
                    <td>
                      {test.name}
                    </td>
                    <td>
                      <AddTestToPatientButton onAddTest={() => handleAddTest(test.id)} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>

        </Table>
      </Container>
      <br />
      <br />

      {/* Delete Test Container */}
      <Container>
        <div className='ui black huge labels'>
          <div className='ui label'>Çözülmesi Beklenen Testler</div>
        </div>

        <Table hover bordered responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Test Kodu</th>
              <th>Test Adı</th>
              <th>Eklenme Tarihi</th>
              <th>Testi Sil</th>
            </tr>
          </thead>

          <tbody>
            {unsolvedDetailedTests.length !== 0 &&
              unsolvedTests.map((unsolvedTest, index) => {
                const counter = index + 1;
                let addedAt = unsolvedDetailedTests[index]?.addedAt;

                return (
                  <tr key={counter}>
                    <th scope='row'>{counter}</th>
                    <td>{unsolvedTest.testCode}</td>
                    <td>{unsolvedTest.name}</td>
                    <td>
                      {console.log(addedAt)}
                      {addedAt && ( // addedAt değerini kontrol edin
                        <>
                          Tarih: {addedAt[2] + '.' + addedAt[1] + '.' + addedAt[0]}
                          <br />
                          Saat: {addedAt[3] + ':' + addedAt[4]}
                        </>
                      )}
                    </td>
                    <td>
                      {console.log(addedAt)}
                      <DeleteTestFromPatientButton
                        patient={patient}
                        testId={unsolvedTest.id}
                        addedAt={addedAt}
                        onDeleteTest={() => handleDeleteTest(unsolvedTest.id, addedAt)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>

        </Table>
      </Container>

    </div>
  );
}

// getting props
function mapStateToProps(state) {
  return {
    // tests
    tests: state.testReducer.tests,

    // unsolved tests
    unsolvedTests: state.spesificUserTestReducer.unsolvedAssignedTests,

    // unsolved detailed tests
    unsolvedDetailedTests: state.spesificUserTestReducer.unsolvedDetailedTests,

    // base user id
    doctorId: state.authReducer.userId,
  };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...testActions, ...spesificUserTestActions }, dispatch),
  };
}

const ConnectedTestOperations = connect(
  mapStateToProps,
  mapDispatchToProps
)(TestOperations);

export default function TestOperationsClass() {
  const location = useLocation();
  const { patient } = location.state;

  return <ConnectedTestOperations patient={patient} />;
}
