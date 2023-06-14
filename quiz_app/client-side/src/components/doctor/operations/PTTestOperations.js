import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import user types
import * as userTypes from '../../user/UserTypes';

// action imports
import * as userActions from '../../../redux/actions/userActions';
import * as testActions from '../../../redux/actions/testActions/testActions';
import * as ptSpesificUserTestActions from '../../../redux/actions/testActions/ptSpesificUserTestActions'

import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import UserDropdown from '../../user/UserDropdown';
import AddTestToPatientButton from '../../relatedPatients/buttons/testButtons/AddTestToPatientButton';
import DeleteTestFromPatientButton from '../../relatedPatients/buttons/testButtons/DeleteTestFromPatientButton';


function PTTestOperations(props) {
    const { actions, user, patient, role, tests, unsolvedTests, unsolvedDetailedTests } = props;

    const [isLoadingUserRole, setIsLoadingUserRole] = useState(true);
    const [isLoadingCanSolveTests, setIsLoadingCanSolveTests] = useState(true);
    const [isLoadingUnsolvedTests, setIsLoadingUnsolvedTests] = useState(true);
    const [isLoadingDetailedUnsolvedTests, setIsDetailedLoadingUnsolvedTests] = useState(true);

    useEffect(() => {
        actions.getUserRole(user.id)
            .then(() => {
                setIsLoadingUserRole(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingUserRole(false);
            })
    }, [actions, user]);

    useEffect(() => {
        if (!isLoadingUserRole) {
            // user can solve tests section
            if (role.toUpperCase() === userTypes.PARENT) {
                actions.getParentCanSolveTests()
                    .then(() => {
                        setIsLoadingCanSolveTests(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoadingCanSolveTests(false);
                    })
            } else if (role.toUpperCase() === userTypes.TEACHER) {
                actions.getTeacherCanSolveTests()
                    .then(() => {
                        setIsLoadingCanSolveTests(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoadingCanSolveTests(false);
                    })
            }

            // delete test section
            if (role.toUpperCase() === userTypes.PARENT) {
                actions.getUnsolvedTestAssignedToParentByParentIdWithPatientId(user.id, patient.id)
                    .then(() => {
                        setIsLoadingUnsolvedTests(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoadingUnsolvedTests(false);
                    })
            } else if (role.toUpperCase() === userTypes.TEACHER) {
                actions.getUnsolvedTestAssignedToTeacherByTeacherIdWithPatientId(user.id, patient.id)
                    .then(() => {
                        setIsLoadingUnsolvedTests(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoadingUnsolvedTests(false);
                    })
            }


            // getting unsolved detailed test section
            if (role.toUpperCase() === userTypes.PARENT) {
                actions.getUnsolvedTestDetailByParentIdAndPatientId(user.id, patient.id)
                    .then(() => {
                        setIsDetailedLoadingUnsolvedTests(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsDetailedLoadingUnsolvedTests(false);
                    })
            } else if (role.toUpperCase() === userTypes.TEACHER) {
                actions.getUnsolvedTestDetailByTeacherIdAndPatientId(user.id, patient.id)
                    .then(() => {
                        setIsDetailedLoadingUnsolvedTests(false);
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsDetailedLoadingUnsolvedTests(false);
                    })
            }
        }

    }, [actions, user, role, patient, isLoadingUserRole])


    if (isLoadingUserRole && isLoadingCanSolveTests &&
        isLoadingUnsolvedTests && isLoadingDetailedUnsolvedTests) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    let userInformationContent;
    if (role.toUpperCase() === userTypes.PARENT) {
        userInformationContent = (
            <div>
                {/* Parent Detail Container */}
                <Container>
                    <Row>
                        <Col xs='12'>
                            <div className='ui black huge labels'>
                                <div className='ui label'>Ebeveyn Bilgileri</div>
                            </div>
                        </Col>
                    </Row>

                    <Container>
                        <Row>
                            <Col xs='auto'>
                                <div className='ui blue huge labels'>
                                    <div className='ui label'>Adı: {user.name}</div>
                                </div>
                            </Col>

                            <Col xs='auto'>
                                <div className='ui blue huge labels'>
                                    <div className='ui label'>Soyadı: {user.surname}</div>
                                </div>
                            </Col>

                            <Col xs='auto'>
                                <div className='ui blue huge labels'>
                                    <div className='ui label'>Numarası: {user.id}</div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        );
    }
    else if (role.toUpperCase() === userTypes.TEACHER) {
        userInformationContent = (
            <div>
                {/* Parent Detail Container */}
                <Container>
                    <Row>
                        <Col xs='12'>
                            <div className='ui black huge labels'>
                                <div className='ui label'>Öğretmen Bilgileri</div>
                            </div>
                        </Col>
                    </Row>

                    <Container>
                        <Row>
                            <Col xs='auto'>
                                <div className='ui blue huge labels'>
                                    <div className='ui label'>Adı: {user.name}</div>
                                </div>
                            </Col>

                            <Col xs='auto'>
                                <div className='ui blue huge labels'>
                                    <div className='ui label'>Soyadı: {user.surname}</div>
                                </div>
                            </Col>

                            <Col xs='auto'>
                                <div className='ui blue huge labels'>
                                    <div className='ui label'>Numarası: {user.id}</div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </div>
        );
    }

    return (
        <div>
            {/* Base User Dropdown Container */}
            <Container>
                <Row>
                    <Col xs='12'>
                        <UserDropdown />
                    </Col>
                </Row>
            </Container>

            {userInformationContent}
            <br />
            <br />


            {/* Patient Detail Container */}
            <Container>
                <Row>
                    <Col xs='12'>
                        <div className='ui black huge labels'>
                            <div className='ui label'>Hasta Bilgileri</div>
                        </div>
                    </Col>
                </Row>

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

            {/* Add Test Container */}
            <Container>
                <div className='ui black huge labels'>
                    <div className='ui label'>Test Ekle</div>
                </div>

                <Table hover bordered responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Test Kodu</th>
                            <th>Test Adı</th>
                            <th>Testi Ekle</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tests && tests.map((test, index) => {
                                const counter = index + 1;

                                return (
                                    <tr key={counter}>
                                        <th scope='row'>{counter}</th>
                                        <td>
                                            {test.testCode}
                                        </td>
                                        <td>
                                            {test.name}
                                        </td>
                                        <td>
                                            <AddTestToPatientButton />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
            </Container>
            <br />
            <br />

            {/* Delete Test Container */}
            <Container>
                <div className='ui black huge labels'>
                    <div className='ui label'>Test Sil</div>
                </div>

                <Table hover bordered responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Test Kodu</th>
                            <th>Test Adı</th>
                            <th>Eklenme Tarihi</th>
                            <th>Testi Sil</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            unsolvedTests && unsolvedTests.map((unsolvedTest, index) => {
                                const counter = index + 1;
                                const addedAt = unsolvedDetailedTests[index].addedAt;

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
                                            Tarih: {addedAt[2] + '.' + addedAt[1] + '.' + addedAt[0]}
                                            <br />
                                            Saat: {addedAt[3] + ':' + addedAt[4]}
                                        </td>
                                        <td>
                                            <DeleteTestFromPatientButton />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

// getting props
function mapStateToProps(state) {
    return {
        // role
        role: state.userReducer.role,

        // tests
        tests: state.testReducer.tests,

        // unsolved tests
        unsolvedTests: state.ptSpesificUserTestReducer.spesificRelatedPatientUnsolvedAssignedTests,

        // unsolved detailed tests
        unsolvedDetailedTests: state.ptSpesificUserTestReducer.unsolvedDetailedTests,

        // base user id
        doctorId: state.authReducer.userId,
    };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...userActions, ...testActions, ...ptSpesificUserTestActions }, dispatch),
    };
}

const ConnectedPTTestOperations = connect(
    mapStateToProps,
    mapDispatchToProps
)(PTTestOperations);

export default function TestOperationsClass() {
    const location = useLocation();
    const { user, patient } = location.state;

    return <ConnectedPTTestOperations patient={patient} user={user} />;
}