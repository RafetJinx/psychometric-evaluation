import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// tools
import SolveTestButton from '../test/SolveTestButton';

// actions
import * as userActions from '../../redux/actions/userActions';
import * as parentTeacherTestActions from '../../redux/actions/testActions/parentTeacherTestActions';
import { Table } from 'reactstrap';

// user types
import * as userTypes from '../user/UserTypes';

class PTUnsolvedTests extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.getUserIdAndRole();
    const { userId, role } = this.props;
    if(role.toUpperCase() === userTypes.PARENT){
      actions.getUnsolvedTestsAssignedToParentByParentId(userId);
    }
    else if(role.toUpperCase() === userTypes.TEACHER){
      actions.getUnsolvedTestsAssignedToTeacherByTeacherId(userId);
    }
  }

  render() {
    return (
      <div>
        <div className='ui black huge labels'>
          <div className='ui label'>
            Çözülmesi Beklenen Testler
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
              <th>Testi Çöz</th>
            </tr>
          </thead>

          <tbody>
            {
              this.props.unsolvedTests && this.props.unsolvedTests.map((unsolvedTest, index) => {
                const counter = index + 1;

                return (
                  <tr key={counter}>
                    <th scope='row'>{counter}</th>
                    <td>{unsolvedTest.id}</td>
                    <td>{unsolvedTest.name}</td>
                    <td>{unsolvedTest.surname}</td>
                    <td>{unsolvedTest.testCode}</td>
                    <td>{unsolvedTest.testName}</td>
                    <td><SolveTestButton/></td>
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
    unsolvedTests: state.parentTeacherTestReducer.relatedPatientsUnsolvedAssignedTests,
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

export default connect(mapStateToProps, mapDispatchToProps)(PTUnsolvedTests);


    // actions: {
    //   getUnsolvedTestsAssignedToParentByParentId: (userId) => {
    //     dispatch(parentTeacherTestActions.getUnsolvedTestsAssignedToParentByParentId(userId.toString()));
    //   },
    //   getUnsolvedTestsAssignedToTeacherByTeacherId: (userId) => {
    //     dispatch(parentTeacherTestActions.getUnsolvedTestsAssignedToTeacherByTeacherId(userId.toString()));
    //   },      
    //   getUserIdAndRole: bindActionCreators(userActions.getUserIdAndRole, dispatch)
    // }