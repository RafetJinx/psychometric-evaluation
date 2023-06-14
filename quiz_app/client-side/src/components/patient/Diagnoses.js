import React, { Component } from 'react';
import { bindActionCreators } from 'redux';



import * as diagnoseActions from '../../redux/actions/diagnoseActions';
import * as userActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { Badge, Table } from 'reactstrap';


class Diagnoses extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.getUserId();
        const { userId } = this.props;
        actions.getDiagnoses(userId);
    }


    render() {
        return (
            <div>
                <Badge color='warning'>
                    Tanılar
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
                                Tanılar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.diagnoses && this.props.diagnoses.map((diagnosis, index) => {
                                const counter = index + 1; // Sayaç değişkeni, index değeri + 1 olarak başlatılıyor

                                return (
                                    <tr key={counter}>
                                        <th scope='row'>{counter}</th>
                                        <td>
                                            {diagnosis}
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
        diagnoses: state.diagnoseReducer.diagnoses,
        userId: state.authReducer.userId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getDiagnoses: (userId) => {
                dispatch(diagnoseActions.getDiagnoses(userId.toString()));
            },
            getUserId: bindActionCreators(userActions.getUserId, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Diagnoses);
