import React, { useEffect, useState } from "react";
import { ButtonGroup, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { axios } from "../../../boot";
import { Button, Form, Input, Select } from "../../../components";
import { blogStatus, rules } from "../../../constants";
import { useGetProducts } from "../../../hooks";
import { objectSelect, toast } from "../../../methods";

export default function Voucher() {
  const navigate = useNavigate();
  const [products, getProducts] = useGetProducts();
  const params = useParams();
  const isNew = params.id === "new";
  const [data, setData] = useState({});
  const getData = () => {
    if (isNew) return;
    const url = `/admins/pub/shop/vouchers/${params.id}`;
    axios.get(url).then((res) => {
      const data = { ...res.data };
      data.date = [data.startDate, data.endDate];
      setData(data);
    });
  };
  const addVoucher = () => {
    const url = "/admins/pub/shop/vouchers";
    const body = { ...data };
    [body.startDate, body.endDate] = body.date;
    formControls
      .filter((e) => e.type === "number")
      .map((e) => e.state)
      .forEach((key) => {
        body[key] = Number(body[key]);
      });
    delete body.date;
    axios.post(url, body).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const updateVoucher = () => {
    const keys = formControls.map((e) => e.state);
    const url = "/admins/pub/shop/vouchers";
    const body = objectSelect(data, keys);
    [body.startDate, body.endDate] = body.date;
    formControls
      .filter((e) => e.type === "number")
      .map((e) => e.state)
      .forEach((key) => {
        body[key] = Number(body[key]);
      });
    body._id = params.id;
    delete body.date;
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const removeVoucher = () => {
    const url = "/admins/pub/shop/vouchers";
    const data = { _id: params.id };
    axios.delete(url, { data }).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const formControls = [
    {
      label: "کد",
      state: "title",
    },
    {
      label: "درصد تخفیف",
      state: "off",
      type: "number",
    },
    {
      label: "درصد تخفیف تتری",
      state: "offUsd",
      type: "number",
    },
    {
      label: "تعداد دفعات قابل استفاده",
      state: "count",
      type: "number",
    },
    {
      tag: Select,
      label: "محصول",
      state: "productId",
      items: products.map((e) => ({ name: e.title_fa, id: e._id })),
    },
    {
      tag: Select,
      label: "وضعیت",
      state: "status",
      items: blogStatus,
    },
    {
      label: "تاریخ",
      state: "date",
      type: "date",
    },
  ];
  useEffect(getProducts, []);
  useEffect(getData, []);
  return (
    <Form onSubmit={isNew ? addVoucher : updateVoucher} className="row">
      {formControls.map((e) => (
        <Col key={e.state} xs="12" md="6" lg="4">
          {React.createElement(e.tag ?? Input, {
            ...e,
            value: data[e.state],
            setValue: (val) => setData((p) => ({ ...p, [e.state]: val })),
          })}
        </Col>
      ))}
      <Col xs="12" className="d-flex flex-center">
        <ButtonGroup>
          {!isNew && (
            <Button variant="danger" onClick={removeVoucher}>
              حذف
            </Button>
          )}
          <Button type="submit">ثبت</Button>
        </ButtonGroup>
      </Col>
    </Form>
  );
}
