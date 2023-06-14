import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//acitons
import * as ptSpesificUserTestActions from '../../redux/actions/testActions/ptSpesificUserTestActions';
import * as userActions from '../../redux/actions/userActions';

// user Types
import * as userTypes from '../user/UserTypes';


class PTSpesificPatientSolvedTests extends Component {

    componentDidMount() {

        const { patient } = this.props;

        const { actions } = this.props;
        actions.getUserIdAndRole();

        const { userId, role } = this.props;
        if (role.toUpperCase() === userTypes.PARENT) {
            actions.getSolvedTestAssignedToParentByParentIdWithPatientId(userId, patient.id);
        }
        else if (role.toUpperCase() === userTypes.TEACHER) {
            actions.getSolvedTestAssignedToTeacherByTeacherIdWithPatientId(userId, patient.id);
        }
    }


    render() {
        return (
            <div>
                <div className='ui big labels'>
                    <div className='ui black label'>
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
                            <th>Test Kodu</th>
                            <th>Test Adı</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {
                            this.props.spesificSolvedTests &&
                            this.props.spesificSolvedTests.map((spesificSolvedTest, index) => {
                                const counter = index + 1;

                                return (
                                    <tr key={counter}>
                                        <th scope='row'>{counter}</th>
                                        <td>{spesificSolvedTest.testCode}</td>
                                        <td>{spesificSolvedTest.name}</td>
                                    </tr>
                                );
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
        spesificSolvedTests: state.ptSpesificUserTestReducer.spesificRelatedPatientSolvedAssignedTests,
        userId: state.authReducer.userId,
        role: state.authReducer.role,
    }
}

// dispatch actions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...ptSpesificUserTestActions, ...userActions }, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PTSpesificPatientSolvedTests);