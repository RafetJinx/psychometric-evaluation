import React, { Component } from 'react';
import { bindActionCreators } from 'redux';


import * as userActions from '../../redux/actions/userActions';
import { connect } from 'react-redux';
import { Badge, Table } from 'reactstrap';


class ShowInformation extends Component {
    componentDidMount() {
        const { actions } = this.props;
        actions.getUserId();
        const { userId } = this.props;
        actions.getUserInfo(userId);
    }


    render() {
        return (
            <div>
                <Badge color='warning'>
                    Bilgiler
                </Badge>

                <Table
                    hover
                    bordered
                    responsive
                >
                    <thead>
                        <tr>
                            <th>Kullanıcı Numarası</th>
                            <th>İsim</th>
                            <th>Soyisim</th>
                            <th>Rol</th>
                            <th>E-Mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{this.props.userId}</td>
                        <td>{this.props.name}</td>
                        <td>{this.props.surname}</td>
                        <td>{this.props.role}</td>
                        <td>{this.props.email}</td>
                    </tbody>
                </Table>
            </div>
        )
    }
}

// getting props
function mapStateToProps(state) {
    return {
        userId: state.authReducer.userId,

        role: state.userReducer.role,
        email: state.userReducer.email,
        name: state.userReducer.name,
        surname: state.userReducer.surname
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            getUserInfo: (userId) => {
                dispatch(userActions.getUserInfo(userId.toString()));
            },
            getUserId: bindActionCreators(userActions.getUserId, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowInformation);
