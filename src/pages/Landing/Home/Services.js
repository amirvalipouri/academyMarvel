import { Accordion, Col, Container, Row } from "react-bootstrap";
import { ServiceCard } from "../../../components";
import { services, questions } from "../../../constants";

export default function Services() {
  return (
    <Container className="d-flex flex-column flex-center text-center row-gap-4">
      <h5 className="text-primary">خدمات ما</h5>
      <h4 className="text-info">ما حرفه‌ای این زمینه هستیم</h4>
      <p className="white-space-pre-wrap lh-md">
        مهم نیست که دنبال چه چیزی هستید، ما میتوانیم قابل اعتمادترین
        {"\n"} روش‌های کسب درآمد را به شما آموزش دهیم
      </p>
      <Row>
        {services.map((item, index) => (
          <Col key={index} xs="9" sm="6" lg="3">
            <ServiceCard {...item} />
          </Col>
        ))}
      </Row>
      <Row className="align-items-start mt-4">
        <Col
          xs="12"
          lg="6"
          className="d-flex flex-column align-items-start row-gap-3"
        >
          <h4 className="text-info">سوالات متداول</h4>
          <p className="text-justify">
            در مدرسه مارول ترید، با هم یاد میگیریم چگونه با اعتماد بیشتری سرمایه
            گذاری کنیم تا سود بیشتری بدست آوریم. علاقه شما و آموزش های ما منجر
            به سود بیشتر شما می‌شود. اگر سئوالی در زمینه آموزش ما داری میتونی
            جوابش رو راحت پیدا کنی یا از ما بپرسی!
          </p>
        </Col>
        <Col xs="12" lg="6">
          <Accordion className="w-100 Accordion d-flex flex-column flex-center row-gap-4">
            {questions.map((item, index) => (
              <Accordion.Item
                key={index}
                eventKey={index}
                className="rounded-10 overflow-hidden border-0 w-100"
              >
                {/* <BAccordion.Header className="bg-info">{title}</BAccordion.Header> */}
                <Accordion.Button className="btn text-start border-0 text-primary bg-primary">
                  {item.title}
                </Accordion.Button>

                <Accordion.Body className="transition text-primary bg-primary">
                  {item.text}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
