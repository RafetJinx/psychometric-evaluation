import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import UserDropdown from '../user/UserDropdown';
import RelatedPatients from '../relatedPatients/RelatedPatients';
import PTUnsolvedTests from '../relatedPatients/PTUnsolvedTests';
import PTSolvedTests from '../relatedPatients/PTSolvedTests';

export default class ParentLayout extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs='12'>
            <UserDropdown />
          </Col>
        </Row>

        <Row>
          <Col xs='12'>
            <RelatedPatients />
          </Col>
          <Col xs='12'>
            <PTUnsolvedTests />
          </Col>
          <Col xs='12'>
            <PTSolvedTests />
          </Col>
        </Row>

      </div>
    );
  }
}
