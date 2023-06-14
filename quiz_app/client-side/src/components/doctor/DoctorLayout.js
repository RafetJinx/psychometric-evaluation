import React, { Component } from 'react'
import { Col, Row } from 'reactstrap'
import UserDropdown from '../user/UserDropdown'
import RelatedPatients from '../relatedPatients/RelatedPatients'

export default class DoctorLayout extends Component {
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
        </Row>
      </div>
    )
  }
}
