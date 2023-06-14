import React, { Component } from 'react';
import SolveTestButton from './SolveTestButton';
import { Badge, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// actions
import * as spesificUserTestActions from '../../redux/actions/testActions/spesificUserTestActions';
import * as userActions from '../../redux/actions/userActions';

class UnSolvedTest extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.getUserId();
        const { userId } = this.props;
        actions.getUnsolvedTestByPatientId(userId);
    }

    // selectTest  yapmak lazım


    render() {
        return (
            <div>
                <Badge color='warning'>
                    Çözülmemiş Testler
                </Badge>

                <Table
                    hover
                    bordered
                    responsive
                >
                    <thead>
                        <tr>
                            <th>
                                No
                            </th>
                            <th>
                                Test Kodu
                            </th>
                            <th>
                                Test Adı
                            </th>
                            <th>
                                Test Çöz
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.unsolvedTests && this.props.unsolvedTests.map((unsolvedTest, index) => {
                                const counter = index + 1; // Sayaç değişkeni, index değeri + 1 olarak başlatılıyor

                                return (
                                    <tr key={counter}>
                                        <th scope='row'>{counter}</th>
                                        <td>
                                            {unsolvedTest.testCode}
                                        </td>
                                        <td>
                                            {unsolvedTest.name}
                                        </td>
                                        <td>
                                            <SolveTestButton />
                                        </td>
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
        unsolvedTests: state.spesificUserTestReducer.unsolvedAssignedTests,
        userId: state.authReducer.userId
    }
}

// dispatch actions
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getUnsolvedTestByPatientId: (userId) => {
                dispatch(spesificUserTestActions.getUnsolvedTestByPatientId(userId.toString()));
            },
            getUserId: bindActionCreators(userActions.getUserId, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnSolvedTest);