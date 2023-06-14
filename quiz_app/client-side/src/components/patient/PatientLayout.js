import React, { Component } from 'react';
import UserDropdown from '../user/UserDropdown';
import PatientDiagnosesButton from './PatientDiagnosesButton';
import { Col, Row } from 'reactstrap';
import SolvedTest from '../test/SolvedTest';
import UnsolvedTest from '../test/UnSolvedTest';

class PatientLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs="6">
            <PatientDiagnosesButton />
          </Col>

          <Col xs="6">
            <UserDropdown />
          </Col>
        </Row>

        <Row>
          <Col xs="6">
            <UnsolvedTest />
          </Col>

          <Col xs="6">
            <SolvedTest />
          </Col>
        </Row>

      </div>


    );
  }
}

export default PatientLayout;
