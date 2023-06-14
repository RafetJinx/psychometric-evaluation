import React, { Component } from 'react'
import { Badge, Table } from 'reactstrap'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



//actions
import * as spesificUserTestActions from '../../redux/actions/testActions/spesificUserTestActions';
import * as userActions from '../../redux/actions/userActions';

class SolvedTest extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.getUserId();
        const { userId } = this.props;
        actions.getSolvedTestByPatientId(userId);
    }

    // selectTest yapmak lazım

    render() {
        return (
            <div>
                <Badge color='warning'>
                    Çözülmüş Testler
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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.solvedTests && this.props.solvedTests.map((solvedTest, index) => {
                                const counter = index + 1; // Sayaç değişkeni, index değeri + 1 olarak başlatılıyor

                                return (
                                    <tr key={counter}>
                                        <th scope='row'>{counter}</th>
                                        <td>
                                            {solvedTest.testCode}
                                        </td>
                                        <td>
                                            {solvedTest.name}
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
        solvedTests: state.spesificUserTestReducer.solvedAssignedTests,
        userId: state.authReducer.userId
    }
}

// dispatch actions
function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getSolvedTestByPatientId: (userId) => {
                dispatch(spesificUserTestActions.getSolvedTestByPatientId(userId.toString()));
            },
            getUserId: bindActionCreators(userActions.getUserId, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolvedTest);