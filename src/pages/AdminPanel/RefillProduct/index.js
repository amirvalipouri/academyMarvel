import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { axios } from "../../../boot";
import { Button, Form, Input } from "../../../components";
import { toast } from "../../../methods";

export default function RefillProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
  const submitRefill = () => {
    const url = "/admins/pub/shop/products/refill";
    const body = { _id: params.id, count: +data.count };
    axios.post(url, body).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const formControls = [
    {
      label: "تعداد اضافه",
      state: "count",
      type: "number",
      dir: "ltr",
    },
  ];
  return (
    <Form className="row" onSubmit={submitRefill}>
      {formControls.map((e) => (
        <Col key={e.state} xs="12" md="6" lg="4">
          {React.createElement(Input, {
            ...e,
            value: data[e.state],
            setValue: (val) => setData((p) => ({ ...p, [e.state]: val })),
          })}
        </Col>
      ))}
      <Col xs="12" className="d-flex flex-center">
        <Button>ثبت</Button>
      </Col>
    </Form>
  );
}
