import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//acitons
import * as ptSpesificUserTestActions from '../../redux/actions/testActions/ptSpesificUserTestActions';
import * as userActions from '../../redux/actions/userActions';
import SolveTestButton from '../test/SolveTestButton';

// user types
import * as userTypes from '../user/UserTypes';

class PTSpesificPatientSolvedTests extends Component {
    componentDidMount() {
        const { patient } = this.props;

        const { actions } = this.props;
        actions.getUserIdAndRole();

        const { userId, role } = this.props;
        if (role.toUpperCase() === userTypes.PARENT) {
            actions.getUnsolvedTestAssignedToParentByParentIdWithPatientId(userId, patient.id);
        }
        else if (role.toUpperCase() === userTypes.TEACHER) {
            actions.getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(userId, patient.id);
        }
    }

    render() {
        return (
            <div>
                <div className='ui big labels'>
                    <div className='ui black label'>
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
                            <th>Test Kodu</th>
                            <th>Test Adı</th>
                            <th>Testi Çöz</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.spesificUnsolvedTests
                            && this.props.spesificUnsolvedTests.map((spesificUnsolvedTest, index) => {
                                const counter = index + 1;
                                return (
                                    <tr key={counter}>
                                        <th scope='row'>{counter}</th>
                                        <td>{spesificUnsolvedTest.testCode}</td>
                                        <td>{spesificUnsolvedTest.name}</td>
                                        <td><SolveTestButton /></td>
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
        spesificUnsolvedTests: state.ptSpesificUserTestReducer.spesificRelatedPatientUnsolvedAssignedTests,
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