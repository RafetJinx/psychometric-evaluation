import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as relatedPatientActions from '../../redux/actions/relatedActions/relatedPatientActions';

// button import
import DoctorShowInformationButton from './buttons/DoctorShowInformationButton';
import ParentalOperationsButton from './buttons/ParentalOperationsButton';
import TeacherOperationsButton from './buttons/TeacherOperationsButton';
import DoctorTestOperationsButton from './buttons/DoctorTestOperationsButton';
import SpesificPateintTestResultsButton from './buttons/SpesificPateintTestResultsButton';
import ShowDiagnosesButton from './buttons/ShowDiagnosesButton';

import TestOperationsButton from './buttons/TestOperationsButton';


// user types
import * as userTypes from '../user/UserTypes';

class RelatedPatients extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.getUserIdAndRole();

    const { userId, role } = this.props;

    if (role.toUpperCase() === userTypes.DOCTOR) {
      actions.getDoctorRelatedPatients(userId);
    } else if (role.toUpperCase() === userTypes.PARENT) {
      actions.getParentRelatedPatients(userId);
    } else if (role.toUpperCase() === userTypes.TEACHER) {
      actions.getTeacherRelatedPatients(userId);
    }
  }

  render() {
    const { role, relatedPatients } = this.props;

    let theadContent;
    if (role.toUpperCase() === userTypes.DOCTOR) {
      theadContent = (
        <tr>
          <th>No</th>
          <th>Ad</th>
          <th>Soyad</th>
          <th>Bilgilerini Görüntüle</th>
          <th>Ebeveyn İşlemleri</th>
          <th>Öğretmen İşlemleri</th>
          <th>Test İşlemleri</th>
          <th>Test Sonuçları</th>
          <th>Tanılar</th>
        </tr>
      );
    } else if (role.toUpperCase() === userTypes.PARENT || role.toUpperCase() === userTypes.TEACHER) {
      theadContent = (
        <tr>
          <th>No</th>
          <th>Ad</th>
          <th>Soyad</th>
          <th>Test İşlemleri</th>
        </tr>
      );
    }

    let tbodyContent;
    if (role.toUpperCase() === userTypes.DOCTOR) {
      tbodyContent = relatedPatients && relatedPatients.map((relatedPatient, index) => {
        const counter = index + 1;

        return (
          <tr key={counter}>
            <th scope='row'>{counter}</th>
            <td>{relatedPatient.name}</td>
            <td>{relatedPatient.surname}</td>
            <td>
              <DoctorShowInformationButton patient={relatedPatient} />
            </td>
            <td>
              <ParentalOperationsButton patient={relatedPatient} />
            </td>
            <td>
              <TeacherOperationsButton patient={relatedPatient} />
            </td>
            <td>
              <DoctorTestOperationsButton patient={relatedPatient} />
            </td>
            <td>
              <SpesificPateintTestResultsButton patient={relatedPatient} />
            </td>
            <td>
              <ShowDiagnosesButton patient={relatedPatient} />
            </td>
          </tr>
        );
      });
    } else if (role.toUpperCase() === userTypes.PARENT || role.toUpperCase() === userTypes.TEACHER) {
      tbodyContent = relatedPatients && relatedPatients.map((relatedPatient, index) => {
        const counter = index + 1;

        return (
          <tr key={counter}>
            <th scope='row'>{counter}</th>
            <td>{relatedPatient.name}</td>
            <td>{relatedPatient.surname}</td>
            <td><TestOperationsButton patient={relatedPatient} /></td>
          </tr>
        );
      });
    }

    return (
      <div>
        <div className='ui black huge labels'>
          <div className='ui label'>İlişkili Hastalar</div>
        </div>

        <Table hover bordered responsive>
          <thead>
            {theadContent}
          </thead>

          <tbody>
            {tbodyContent}
          </tbody>
        </Table>
      </div>
    );
  }


}

function mapStateToProps(state) {
  return {
    relatedPatients: state.relatedPatientReducer.relatedPatients,
    userId: state.authReducer.userId,
    role: state.authReducer.role
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...relatedPatientActions, ...userActions }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedPatients);