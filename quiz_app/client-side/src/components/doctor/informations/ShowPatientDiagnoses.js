import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as diagnoseActions from '../../../redux/actions/diagnoseActions';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import UserDropdown from '../../user/UserDropdown';

// import * as userTypes from '../../user/UserTypes';

function ShowPatientDiagnoses(props) {
  const { actions, patient, diagnoses } = props;
  const [isLogadingUserInfo, setIsLogadingUserInfo] = useState(true);

  useEffect(() => {
    actions.getDiagnoses(patient.id)
      .then(() => {
        setIsLogadingUserInfo(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLogadingUserInfo(false);
      })
  }, [actions, patient]);

  if (isLogadingUserInfo) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Container>
        <Row>
          <Col xs='12'>
            <UserDropdown />
          </Col>
        </Row>
      </Container>

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
      <br /><br />

      <Container>
        <div className='ui black huge labels'>
          <div className='ui label'>Tanılar</div>
        </div>



        <Table hover bordered responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanılar</th>
            </tr>
          </thead>

          <tbody>
            {
              diagnoses && diagnoses.map((diagnosis, index) => {
                const counter = index + 1;

                return (
                  <tr key={counter}>
                    <th scope='row'>{counter}</th>
                    <td>
                      {diagnosis}
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
    // user information detail
    diagnoses: state.diagnoseReducer.diagnoses,

    // base user id
    doctorId: state.authReducer.userId,
  };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...diagnoseActions }, dispatch),
  };
}

const ConnectedShowPatientDiagnoses = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPatientDiagnoses);

export default function ShowPatientDiagnosesClass() {
  const location = useLocation();
  const { patient } = location.state;

  return <ConnectedShowPatientDiagnoses patient={patient} />;
}
