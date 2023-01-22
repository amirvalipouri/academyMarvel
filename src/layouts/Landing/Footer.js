import { Col, Container, Row } from "react-bootstrap";
// import telephoneIcon from "../../assets/icons/telephone-light.svg";
// import locationIcon from "../../assets/icons/location-light.svg";
// import envelopeIcon from "../../assets/icons/envelope-light.svg";
import { BgImage } from "../../components";
import { socialNetworks } from "../../constants";
export default function Footer() {
  return (
    <footer className="position-relative bg-primary py-4">
      <BgImage type={2} fullSize objectFit="cover" />
      <Container>
        <Row>
          <Col xs="12" lg="8">
            <Row className="text-center align-items-stretch">
              {/* <Col xs="12" md="3" className="py-2">
                <div className="d-flex flex-column flex-center row-gap-4">
                  <img width="30" src={telephoneIcon} alt="telephone" />
                  <p className="text-light">
                    +98 123456 789 78
                    <br />
                    +98 2215 2285 55
                  </p>
                </div>
              </Col> */}
              <Col
                xs="12"
                md
                className=" py-2"
                // border-end border-start border-light+
              >
                {/* <div className="d-flex flex-column flex-center row-gap-4">
                  <img width="30" src={locationIcon} alt="location" />
                  <p className="text-light">
                    ﺗﻬﺮان، ﺧﯿﺎﺑﺎن ﺟﻤﻬﻮری، ﺧﯿﺎﺑﺎن 345 ﻓﺮوردﯾﻦ
                    <br />
                    ﻧﺒﺶ ﺗﻘﺎﻃﻊ ﺧﯿﺎﺑﺎن آذرﺑﺎﯾﺠﺎن، ﭘﻠﺎک 110
                  </p>
                </div> */}
                <h4 className="text-light mb-3">شبکه‌های اجتماعی</h4>
                <div className="d-flex flex-center gap-5">
                  {socialNetworks.map((item, index) => (
                    <a
                      key={index}
                      href={item.link}
                      className={`transition fs-3 bi bi-${item.icon}`}
                    >
                      {""}
                    </a>
                  ))}
                </div>
              </Col>
              {/* <Col xs="12" md="3" className="py-2">
                <div className="d-flex flex-column flex-center row-gap-4">
                  <img width="30" src={envelopeIcon} alt="envelope" />
                  <p className="text-light">
                    google@gmail.com
                    <br />
                    google@gmail.com
                  </p>
                </div>
              </Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
