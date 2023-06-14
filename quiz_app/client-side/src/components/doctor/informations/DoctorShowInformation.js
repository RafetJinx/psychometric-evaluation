import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../../redux/actions/userActions';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import UserDropdown from '../../user/UserDropdown';

// import * as userTypes from '../../user/UserTypes';

function DoctorShowInformation(props) {
  const { actions, patient, userId, email, name, surname } = props;
  const [isLogadingUserInfo, setIsLogadingUserInfo] = useState(true);

  useEffect(() => {
    actions.getUserInfo(patient.id)
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


      {/* patient information */}
      <Container fluid className='p-2'>
        <Row>
          <Col xs='12'>
            <div className='ui black huge labels'>
              <div className='ui label'>
                Hasta Bilgileri
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container>
        {/* patient name*/}
        <Row>
          <Col xs='4'>
            <div className='ui black huge labels'>
              <div className='ui label'>
                Hastanın Adı:
              </div>
            </div>
          </Col>
          <Col xs='auto'>
            <div className='ui blue huge labels'>
              <div className='ui label'>
                {name}
              </div>
            </div>
          </Col>
        </Row>

        {/* patient surname */}
        <Row>
          <Col xs='4'>
            <div className='ui black huge labels'>
              <div className='ui label'>
                Hastanın Soyadı:
              </div>
            </div>
          </Col>
          <Col xs='auto'>
            <div className='ui blue huge labels'>
              <div className='ui label'>
                {surname}
              </div>
            </div>
          </Col>
        </Row>

        {/* patient number */}
        <Row>
          <Col xs='4'>
            <div className='ui black huge labels'>
              <div className='ui label'>
                Hasta Numarası:
              </div>
            </div>
          </Col>
          <Col xs='auto'>
            <div className='ui blue huge labels'>
              <div className='ui label'>
                {userId}
              </div>
            </div>
          </Col>
        </Row>

        {/* patient email */}
        <Row>
          <Col xs='4'>
            <div className='ui black huge labels'>
              <div className='ui label'>
                Email:
              </div>
            </div>
          </Col>
          <Col xs='auto'>
            <div className='ui blue huge labels'>
              <div className='ui label'>
                {email}
              </div>
            </div>
          </Col>
        </Row>
      </Container>


    </div>
  );
}

// getting props
function mapStateToProps(state) {
  return {
    // user information detail
    userId: state.userReducer.userId,
    role: state.userReducer.role,
    email: state.userReducer.email,
    name: state.userReducer.name,
    surname: state.userReducer.surname,

    // base user id
    doctorId: state.authReducer.userId,
  };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions }, dispatch),
  };
}

const ConnectedDoctorShowInformation = connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorShowInformation);

export default function DoctorShowInformationClass() {
  const location = useLocation();
  const { patient } = location.state;

  return <ConnectedDoctorShowInformation patient={patient} />;
}
