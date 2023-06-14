import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// button imports
import PTShowInformationButton from '../../relatedPatients/buttons/ptOperationsButtons/PTShowInformationButton';
import PTTestOperationsButton from '../../relatedPatients/buttons/ptOperationsButtons/PTTestOperationsButton';
import PTTestResultsButton from '../../relatedPatients/buttons/ptOperationsButtons/PTTestResultsButton';


// action imports
import * as userActions from '../../../redux/actions/userActions';
import * as relatedParentActions from '../../../redux/actions/relatedActions/relatedParentActions';
import * as relatedTeacherActions from '../../../redux/actions/relatedActions/relatedTeacherActions';

import { useLocation } from 'react-router-dom';

import UserDropdown from '../../user/UserDropdown';

import * as userTypes from '../../user/UserTypes';
import { Col, Container, Row, Table } from 'reactstrap';

function PTOperations(props) {
  const { actions, patient, role, parents, teachers } = props;
  const [isLoadingParentOrTeacher, setIsLoadingParentOrTeacher] = useState(true);

  useEffect(() => {
    if (role === userTypes.PARENT) {
      actions.getRelatedParentNameAndSurnameAndParentNumberByPatientId(patient.id)
        .then(() => {
          setIsLoadingParentOrTeacher(false);

        })
        .catch((error) => {
          console.log(error);
          setIsLoadingParentOrTeacher(false);
        })
    }
    else if (role === userTypes.TEACHER) {
      actions.getRelatedTeacherNameAndSurnameAndTeacherNumberByPatientId(patient.id)
        .then(() => {
          setIsLoadingParentOrTeacher(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoadingParentOrTeacher(false);
        })
    }
  }, [actions, patient, role]);

  if (isLoadingParentOrTeacher) {
    return (
      <div>
        Loading...
      </div>
    );
  }






  let tableHeaderContent;
  if (role === userTypes.PARENT) {
    tableHeaderContent = (
      <div className='ui label'>İlişkili Ebeveynler</div>
    );
  } else if (role === userTypes.TEACHER) {
    tableHeaderContent = (
      <div className='ui label'>İlişkili Öğretmenler</div>
    );
  }

  let tableBodyContent;
  if (role === userTypes.PARENT && parents) {
    tableBodyContent = parents.map((parent, index) => {
      const counter = index + 1;

      return (
        <tr key={counter}>
          <th scope='row'>{counter}</th>
          <td>{parent.name}</td>
          <td>{parent.surname}</td>
          <td>{parent.id}</td>
          <td><PTShowInformationButton user={parent} patient={patient} /></td>
          <td><PTTestOperationsButton user={parent} patient={patient} /></td>
          <td><PTTestResultsButton user={parent} patient={patient} /></td>
        </tr>
      )
    });
  } else if (role === userTypes.TEACHER && teachers) {
    tableBodyContent = teachers.map((teacher, index) => {
      const counter = index + 1;

      return (
        <tr key={counter}>
          <th scope='row'>{counter}</th>
          <td>{teacher.name}</td>
          <td>{teacher.surname}</td>
          <td>{teacher.id}</td>
          <td><PTShowInformationButton user={teacher} patient={patient} /></td>
          <td><PTTestOperationsButton user={teacher} patient={patient} /></td>
          <td><PTTestResultsButton user={teacher} patient={patient} /></td>
        </tr>
      )
    })
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


      <div className='ui black huge labels'>
        <div className='ui label'>İlgili Hasta</div>
      </div>

      
      <Container>
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




      <div className='ui black huge labels'>
        {tableHeaderContent}
      </div>

      <Table hover bordered responsive >
        <thead>
          <tr>
            <th>No</th>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Numarası</th>
            <th>Bilgilerini Görüntüle</th>
            <th>Test İşlemleri</th>
            <th>Test Sonuçları</th>
          </tr>
        </thead>

        <tbody>
          {tableBodyContent}
        </tbody>
      </Table>

    </div>
  );
}

// getting props
function mapStateToProps(state) {
  return {
    // user information detail
    userId: state.userReducer.userId,

    // teacher
    parents: state.relatedParentReducer.relatedParents,
    teachers: state.relatedTeacherReducer.relatedTeachers,


    // base user id
    doctorId: state.authReducer.userId,
  };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...relatedParentActions,
      ...relatedTeacherActions,
      ...userActions
    }, dispatch),
  };
}

const ConnectedPTOperations = connect(
  mapStateToProps,
  mapDispatchToProps
)(PTOperations);

export default function PTOperationsClass() {
  const location = useLocation();
  const { patient, role } = location.state;


  return <ConnectedPTOperations patient={patient} role={role} />;
}
