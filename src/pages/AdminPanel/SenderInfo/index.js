import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { axios } from "../../../boot";
import { Button, CheckBox, Form, Input, Select } from "../../../components";
import { paymentTypes, rules, shippingTypes } from "../../../constants";
import { convertPhone, objectSelect, toast } from "../../../methods";
import {
  useGetCities,
  useGetProvinces,
  useGetSenderInfo,
} from "../../../hooks";
export default function SenderInfo() {
  const [provinces] = useGetProvinces();
  const [cities, getCities] = useGetCities();
  const [data, setData] = useGetSenderInfo();
  const submitData = () => {
    const keys = formControls.map((e) => e.state);
    const url = "/admins/pub/shop/sender-info";
    const body = objectSelect(data, keys);
    body.senderMobile = convertPhone(body.senderMobile);
    formControls
      .filter((e) => e.type === "number")
      .map((e) => e.state)
      .forEach((key) => {
        !["senderMobile", "senderPostCode"].includes(key) &&
          (body[key] = Number(body[key]));
      });
    axios.post(url, body).then(() => {
      toast({});
    });
  };
  const formControls = [
    {
      label: "نام ارسال کننده",
      state: "senderFirstName",
    },
    {
      label: "نام خانوادگی ارسال کننده",
      state: "senderLastName",
    },
    {
      label: "موبایل ارسال کننده",
      state: "senderMobile",
      type: "number",
      rules: rules.phoneNumber,
    },
    {
      tag: Select,
      label: "استان ارسال کننده",
      state: "senderProvince",
      items: provinces,
      filter: true,
    },
    {
      tag: Select,
      label: "شهر ارسال کننده",
      state: "senderCity",
      items: cities,
      filter: true,
    },
    {
      label: "آدرس ارسال کننده",
      state: "senderAddress",
    },
    {
      label: "کد پستی ارسال کننده",
      state: "senderPostCode",
      type: "number",
      rules: rules.postCode,
    },
    {
      tag: CheckBox,
      label: "نیاز به بیمه دارد؟",
      state: "needInsurance",
      btnLabel: ["دارد", "ندارد"],
    },
    {
      tag: CheckBox,
      label: "چاپ لوگو",
      state: "printLogo",
      btnLabel: ["چاپ شود", "چاپ نشود"],
    },
    {
      tag: CheckBox,
      label: "پیامک ارسال شود؟",
      state: "notifyBySms",
    },
    {
      tag: CheckBox,
      label: "نیاز به بسته بندی?",
      state: "needPackage",
      btnLabel: ["دارد", "ندارد"],
    },
    {
      tag: CheckBox,
      label: "needPrinter",
      state: "needPrinter",
    },
    {
      tag: Select,
      label: "نوع ارسال",
      state: "shippingType",
      type: "number",
      items: shippingTypes,
    },
    {
      tag: Select,
      label: "نوع پرداخت",
      state: "paymentType",
      type: "number",
      items: paymentTypes,
    },
  ];
  useEffect(() => getCities(data.senderProvince), [data.senderProvince]);
  return (
    <Form className="row" onSubmit={submitData}>
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
        <Button type="submit">ثبت</Button>
      </Col>
    </Form>
  );
}
