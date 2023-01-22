import { Col, Container, Row } from "react-bootstrap";
import { socialNetworks } from "../../constants";
import envelopeIcon from "../../assets/icons/envelope-blue.svg";
import { info } from "../../constants";

export default function FooterContent({ as = Container }) {
  const Layout = as;
  return (
    <Layout className="py-4">
      <Row className="text-center">
        <Col xs="12" lg="4" className="py-2 text-lg-start">
          <div className="d-flex flex-center col-gap-3 mx-auto me-lg-0 w-fit">
            <i className="bi bi-share fs-2 text-primary" />
            <div className="text-info">
              {socialNetworks.map((e) => (
                <a
                  key={e.id}
                  dir="ltr"
                  target="_blank"
                  rel="noreferrer"
                  href={e.link}
                  className="d-flex align-items-center"
                >
                  <i className={`me-2 fs-5 bi bi-${e.icon}`} />
                  {e.id}
                </a>
              ))}
            </div>
          </div>
        </Col>
        <Col
          xs="12"
          lg="4"
          className="border-end border-start border-light py-2"
        >
          <div className="d-flex flex-center col-gap-3 mx-auto w-fit">
            {/* <i className="bi bi-flag fs-2 text-primary" /> */}
            <p className="text-info">{info.text}</p>
          </div>
        </Col>
        <Col xs="12" lg="4" className="py-2 text-lg-end">
          <div className="d-flex flex-center col-gap-3 mx-auto ms-lg-0 w-fit">
            <img width="30" src={envelopeIcon} alt="envelope" />
            <p className="text-info">{info.email}</p>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
