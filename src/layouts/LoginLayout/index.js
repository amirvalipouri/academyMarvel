import { Col, Row } from "react-bootstrap";
import { Outlet, useLocation } from "react-router";
import { Link } from "react-router-dom";
import mainImage from "../../assets/images/login.png";
import { FooterContent } from "../../components";
import "./index.scss";

export default function LoginLayout() {
  const location = useLocation();
  const isSignIn = location.pathname === "/sign-in";
  return (
    <Row
      className={`LoginLayout flex-${
        isSignIn ? "row" : "row-reverse"
      } overflow-hiddenn align-items-start row-gap-0`}
    >
      <Col xs="12" lg="6" className="main-img p-0 d-none d-lg-block">
        <img
          className={`w-100 h-100 object-fit-cover rounded-${
            isSignIn ? "start" : "end"
          }`}
          src={mainImage}
          alt="mainImage"
        />
      </Col>
      <Col xs="12" lg="6" className="routes overflow-auto d-flex flex-column">
        <Row className="py-3">
          <Col xs="12" md="10" lg="8">
            <Link to="/" replace className="d-block w-fit me-auto bi bi-x-lg" />
          </Col>
        </Row>
        <Row className="m-auto py-3">
          <Col xs="12" md="10" lg="8">
            <Outlet />
          </Col>
        </Row>
      </Col>
      <Col as="footer" xs="12">
        <FooterContent />
      </Col>
    </Row>
  );
}
