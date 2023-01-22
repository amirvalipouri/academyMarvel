import React from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, Navigate } from "react-router";
import { Video } from "../../../components";
import { source } from "../../../methods";

export default function Class() {
  const location = useLocation();
  const activeClass = location.state?.activeClass;
  return activeClass ? (
    <div className="bg-white rounded shadow-sm p-2 mb-3">
      <Row>
        <Col xs="12" lg="8">
          <div className="py-3 d-flex flex-column row-gap-3">
            <h1 className="h4">{activeClass.title}</h1>
            <Video
              thumbnail={source(activeClass.thumbnail)}
              tracks={[
                {
                  default: true,
                  src: source(activeClass.faSubtitle),
                },
              ]}
              sources={[
                {
                  src: source(activeClass.videoLq),
                  size: 720,
                },
                {
                  src: source(activeClass.videoHq),
                  size: 480,
                },
              ]}
            />
            <p className="text-justify">{activeClass.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <Navigate to="/classes" replace />
  );
}
