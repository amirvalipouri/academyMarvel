import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { axios } from "../../../boot";
import { Button, Form, Input } from "../../../components";
import { rules } from "../../../constants";
import { toast } from "../../../methods";

export default function ShippingInfo() {
  const [data, setData] = useState({});
  const getData = () => {
    const url = "/admins/pub/shop/shipping-info";
    axios.get(url).then(({ data }) => {
      setData(data);
    });
  };
  const updateData = () => {
    const url = "/admins/pub/shop/shipping-info";
    const body = { ...data };
    delete body.createdAt;
    Object.keys(body).forEach((key) => {
      body[key] = +body[key];
    });
    axios.post(url, body).then(() => {
      toast({});
    });
  };
  const formControls = [
    {
      label: "تهران (تومان)",
      state: "toTehran",
    },
    {
      label: "تهران (تتر)",
      state: "toTehranUsd",
    },
    {
      label: "سایر شهرستان‌ها (تومان)",
      state: "toIran",
    },
    {
      label: "سایر شهرستان‌ها (تتر)",
      state: "toIranUsd",
    },
    {
      label: "خارج از ایران (تومان)",
      state: "toOtherCountries",
    },
    {
      label: "خارج از ایران (تتر)",
      state: "toOtherCountriesUsd",
    },
  ];
  useEffect(getData, []);
  return (
    <Form onSubmit={updateData} className="row">
      {formControls.map((e) => (
        <Col key={e.state} xs="12" md="6" lg="4">
          <Input
            {...e}
            value={data[e.state]}
            setValue={(val) => setData((p) => ({ ...p, [e.state]: val }))}
          />
        </Col>
      ))}
      <Col xs="12" className="d-flex flex-center">
        <Button type="submit">ثبت</Button>
      </Col>
    </Form>
  );
}
