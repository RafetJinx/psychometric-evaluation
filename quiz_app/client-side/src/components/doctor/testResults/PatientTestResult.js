import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// action imports
import * as spesificUserTestActions from '../../../redux/actions/testActions/spesificUserTestActions';
import * as testActions from '../../../redux/actions/testActions/testActions';

import { useLocation } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import UserDropdown from '../../user/UserDropdown';

function PatientTestResult(props) {
    const { actions, patient, test, solvedAt, testDetail, solvedDetailedTests } = props;
    const [isLoadingTestDetail, setIsLoadingTestDetail] = useState(true);
    const [isLoadingSolvedDetailedTests, setIsLoadingSolvedDetailedTests] = useState(true);

    useEffect(() => {
        // Getting test details
        actions.getSpesificTestDetail(test.id)
            .then(() => {
                setIsLoadingTestDetail(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingTestDetail(false);
            })


        actions.getSolvedTestDetailByPatientId(patient.id)
            .then(() => {
                setIsLoadingSolvedDetailedTests(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingSolvedDetailedTests(false);
            })
    }, [actions, patient, test]);

    let testResult;
    let totalPoint = 0;

    for (let i = 0; i < solvedDetailedTests.length; i++) {
        if (JSON.stringify(solvedAt) === JSON.stringify(solvedDetailedTests[i].solvedAt)) {
            testResult = solvedDetailedTests[i];
        }
    }

    if (isLoadingTestDetail && isLoadingSolvedDetailedTests) {
        return (
            <div>
                Loading...
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
                        <Col xs='12'>
                            <div className='ui blue huge labels'>
                                <div className='ui label'>Adı: {patient.name}</div>
                            </div>
                        </Col>

                        <Col xs='12'>
                            <div className='ui blue huge labels'>
                                <div className='ui label'>Soyadı: {patient.surname}</div>
                            </div>
                        </Col>

                        <Col xs='12'>
                            <div className='ui blue huge labels'>
                                <div className='ui label'>Numarası: {patient.id}</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <br />
            <br />

            {/* Display Test Details Tests Container */}
            <Container>
                <div className='ui black huge labels'>
                    <div className='ui label'>İlgili Testin Detayları</div>
                </div>

                <Table hover bordered responsive>
                    <thead>
                        <tr>
                            <th>Test Kodu</th>
                            <th>Test Adı</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>{test.testCode}</td>
                            <td>{test.name}</td>
                        </tr>
                    </tbody>

                </Table>
            </Container>
            <br />
            <br />

            {/* Display Test Questions Container */}
            <Container>
                <div className='ui black huge labels'>
                    <div className='ui label'>İlgili Testin Detayları</div>
                </div>

                <Table hover bordered responsive>
                    <thead>
                        <tr>
                            <th>Soru Numarası</th>
                            <th>Test Adı</th>
                            <th>Verilen Cevap</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            testDetail.questions && testDetail.questions.map((question, index) => {
                                const counter = index + 1;
                                totalPoint += testResult.results.answers[index]
                                return (
                                    <tr key={counter}>
                                        <th scope='row'>{counter}</th>
                                        <td>{question.question}</td>
                                        <td>{testResult.results.answers[index]}</td>
                                    </tr>
                                    
                                );
                            })
                        }
                    </tbody>
                </Table>
            </Container>

            <Container>
                <div className='ui black huge labels float-end'>
                    <div className='ui label'>Alınan Puan : {totalPoint}</div>
                </div>
            </Container>
        </div>
    );
}

// getting props
function mapStateToProps(state) {
    return {
        // test detail
        testDetail: state.testReducer.testDetail,

        solvedDetailedTests: state.spesificUserTestReducer.solvedDetailedTests,

        // base user id
        doctorId: state.authReducer.userId,
    };
}

// dispatch actions
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ ...spesificUserTestActions, ...testActions }, dispatch),
    };
}

const ConnectedPatientTestResult = connect(
    mapStateToProps,
    mapDispatchToProps
)(PatientTestResult);

export default function TestOperationsClass() {
    const location = useLocation();
    const { patient, test, solvedAt } = location.state;

    return <ConnectedPatientTestResult patient={patient} test={test} solvedAt={solvedAt} />;
}
