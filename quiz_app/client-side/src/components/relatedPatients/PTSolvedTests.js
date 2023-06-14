import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import * as userActions from '../../redux/actions/userActions';
import * as parentTeacherTestActions from '../../redux/actions/testActions/parentTeacherTestActions';
import { Table } from 'reactstrap';

// user types
import * as userTypes from '../user/UserTypes';

class PTSolvedTests extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getUserIdAndRole();
    const { userId, role } = this.props;
    if (role.toUpperCase() === userTypes.PARENT) {
      actions.getSolvedTestsAssignedToParentByParentId(userId);
    }
    else if (role.toUpperCase() === userTypes.TEACHER) {
      actions.getSolvedTestsAssignedToTeacherByTeacherId(userId);
    }
  }

  render() {
    return (
      <div>
        <div className='ui black huge labels'>
          <div className='ui label'>
            Çözülen Testler
          </div>
        </div>

        <Table
          hover
          bordered
          responsive
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Hasta Numarası</th>
              <th>Ad</th>
              <th>Soyad</th>
              <th>Test Kodu</th>
              <th>Test Adı</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.solvedTests && this.props.solvedTests.map((solvedTest, index) => {
                const counter = index + 1;

                return (
                  <tr key={counter}>
                    <th scope='row'>{counter}</th>
                    <td>{solvedTest.id}</td>
                    <td>{solvedTest.name}</td>
                    <td>{solvedTest.surname}</td>
                    <td>{solvedTest.testCode}</td>
                    <td>{solvedTest.testName}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

// getting props
function mapStateToProps(state) {
  return {
    solvedTests: state.parentTeacherTestReducer.relatedPatientsSolvedAssignedTests,
    userId: state.authReducer.userId,
    role: state.authReducer.role
  }
}

// dispatch actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...parentTeacherTestActions, ...userActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PTSolvedTests);

// actions: {
//   getSolvedTestsAssignedToParentByParentId: (userId) => {
//     dispatch(parentTeacherTestActions.getSolvedTestsAssignedToParentByParentId(userId.toString()));
//   },
//   getSolvedTestsAssignedToTeacherByTeacherId: (userId) => {
//     dispatch(parentTeacherTestActions.getSolvedTestsAssignedToTeacherByTeacherId(userId.toString()));
//   },
//   getUserId: bindActionCreators(userActions.getUserId, dispatch),
//   getUserIdAndRole: bindActionCreators(userActions.getUserIdAndRole, dispatch)
// }