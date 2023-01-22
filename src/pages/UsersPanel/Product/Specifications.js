import React from "react";
import { Col, Row } from "react-bootstrap";

export default function Specifications({ info = [] }) {
  return (
    <Row>
      {info.map((e, i) => (
        <React.Fragment key={i}>
          {i !== 0 && <hr className="col-12 bg-light-gray opacity-5" />}
          <Col xs="6" className="text-dark fs-5">
            {e.label}:
          </Col>
          <Col xs="6" className="text-secondary fs-5">
            {e.value}
          </Col>
        </React.Fragment>
      ))}
    </Row>
  );
}
