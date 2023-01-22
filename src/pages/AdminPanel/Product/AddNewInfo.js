import { useState } from "react";
import { Col } from "react-bootstrap";
import { Button, Form, Input, Modal } from "../../../components";
import { rules } from "../../../constants";

export default function AddNewInfo({
  show = false,
  onHide = () => {},
  submit = () => {},
}) {
  const [label, setLabel] = useState("");
  const submitNewInfo = () => {
    const infoItem = {
      label,
      value: "",
    };
    submit(infoItem);
    setLabel("");
    onHide();
  };
  return (
    <Modal show={show} onHide={onHide} title="اضافه کردن مقدار جدید">
      <Form className="row" onSubmit={submitNewInfo}>
        <Col xs="12">
          <Input
            label="نام مقدار"
            value={label}
            setValue={setLabel}
            rules={rules.required}
          />
        </Col>
        <Col xs="12">
          <Button type="submit" className="mx-auto">
            اضافه کردن
          </Button>
        </Col>
      </Form>
    </Modal>
  );
}
