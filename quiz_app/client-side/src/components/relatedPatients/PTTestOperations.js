import React from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import UserDropdown from '../user/UserDropdown';
import PTSpesificPatientSolvedTests from '../relatedPatients/PTSpesificPatientSolvedTests';
import PTSpesificPatientUnsolvedTests from '../relatedPatients/PTSpesificPatientUnsolvedTests';

const PTTestOperations = () => {
  const { state } = useLocation();
  const { patient } = state;


  return (
    <div>
      <Container>
        <Row>
          <Col xs='12'>
            <UserDropdown />
          </Col>
        </Row>
      </Container>

      {/* Patient Details */}
      <Container fluid className='p-2'>
        <Row>
          <Col xs='12'>
            <div className='ui black huge labels'>
              <div className='ui label'>
                İlgili Kişi Bilgisi
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs="auto">
            <div className='ui blue huge labels'>
              <div className='ui label'>
                Ad: {patient.name}
              </div>
            </div>
          </Col>
          <Col xs="auto">
            <div className='ui blue huge labels'>
              <div className='ui label'>
                Soyad: {patient.surname}
              </div>
            </div>
          </Col>
          <Col xs="auto">
            <div className='ui blue huge labels'>
              <div className='ui label'>
                Numara: {patient.id}
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <br />
      <Container
        fluid>
        <Row>
          <div class="d-grid gap-5">
            <div class="p-2 bg-light border">
              <Col xs='12'>
                <PTSpesificPatientSolvedTests patient={patient} />
              </Col>
            </div>
            <div class="p-2 bg-light border">
              <Col xs='12'>
                <PTSpesificPatientUnsolvedTests patient={patient} />
              </Col>
            </div>
          </div>
        </Row>
      </Container>


    </div>
  );
};

export default PTTestOperations;
