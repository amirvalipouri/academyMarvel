import { Col, Container, Row } from "react-bootstrap";
import { Button, SubscriptionCard } from "../../../components";
import { subscriptions } from "../../../constants";

export default function Subscriptions() {
  return (
    <Container className="d-flex flex-column flex-center text-center row-gap-4">
      <span className="text-primary">اشتراک‌های ما</span>
      <h4 className="text-info">سرویس مورد نظر خود را انتخاب کنید</h4>
      <Row>
        <Col as={Button} xs="5" md="4" lg="1" className="border-0">
          ماهانه
        </Col>
        <Col as={Button} outline xs="5" md="4" lg="1" className="border-0">
          ماهانه
        </Col>
      </Row>
      <Row>
        {subscriptions.map((item, index) => (
          <Col key={index} xs="12" md="6" xl="4">
            <SubscriptionCard {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
