import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { axios } from "../../../boot";
import { Select, Form, Input, Button } from "../../../components";
import { rules } from "../../../constants";
import { convertPhone, toast } from "../../../methods";
import { useGetProvinces, useGetCities } from "../../../hooks";
export default function Address({
  data = {},
  setData = () => {},
  activeAddress = false,
  setActiveAddress = () => {},
  setCartInfo = () => {},
}) {
  const [provinces] = useGetProvinces();
  const [cities, getCities] = useGetCities();
  const setAddress = () => {
    const url = "/purchases/pre-purchase";
    const body = { ...data };
    if (isToIran) {
      body.address = `${body.province} - ${body.city} - ${body.address}`;
      body.province === "تهران" && (body.shippingMethod = "toTehran");
    }
    delete body.province;
    delete body.city;
    body.phone = convertPhone(body.phone);
    axios.post(url, body).then(({ data }) => {
      const text = "آدرس با موفقیت ثبت شد. لطفا فرایند خرید را ادامه دهید";
      toast({ text });
      setCartInfo(data);
      setActiveAddress(true);
    });
  };
  const isToIran = data.shippingMethod === "toIran";
  const formControls = [
    {
      label: "نام",
      state: "firstName",
    },
    {
      label: "نام خانوادگی",
      state: "lastName",
    },
    {
      tag: Select,
      label: "ارسال به",
      state: "shippingMethod",
      items: [
        { name: "داخل ایران", id: "toIran" },
        { name: "خارج از ایران", id: "toOtherCountries" },
      ],
    },
    isToIran && {
      tag: Select,
      label: "استان",
      state: "province",
      filter: true,
      items: provinces,
    },
    isToIran && {
      tag: Select,
      label: "شهر",
      state: "city",
      filter: true,
      items: cities,
    },
    {
      as: "textarea",
      label: "آدرس دقیق",
      state: "address",
    },
    {
      label: "کد پستی",
      state: "postCode",
    },
    {
      dir: "ltr",
      label: "شماره تلفن همراه",
      state: "phone",
      type: "number",
    },
    {
      as: "textarea",
      label: "توضیحات (اختیاری)",
      state: "comment",
      rules: rules.optional,
    },
  ].filter(Boolean);
  useEffect(() => getCities(data.province), [data.province]);
  return (
    <React.Fragment>
      <div className="wrapper">
        <h6 className="text-dark mb-2">آدرس تحویل سفارش</h6>
        {activeAddress && (
          <React.Fragment>
            <p>
              <i className="bi bi-person fs-3 ms-1" />
              {data.firstName} {data.lastName}
            </p>
            <p>
              <i className="bi bi-geo-alt fs-3 ms-1" />
              {data.address}
            </p>
          </React.Fragment>
        )}
        <Form className="row" onSubmit={setAddress}>
          {formControls.map((e) => (
            <Col
              key={e.state}
              xs="12"
              lg={
                e.as === "textarea" || e.state === "shippingMethod" ? "12" : "6"
              }
            >
              {React.createElement(e.tag ?? Input, {
                ...e,
                value: data[e.state],
                setValue: (val) => setData((p) => ({ ...p, [e.state]: val })),
              })}
            </Col>
          ))}
          <Col xs="12">
            <Button type="submit" className="w-100">
              <i className="bi bi-pen-fill ms-1" />
              {data.address && activeAddress ? "ویرایش" : "ثبت"} اطلاعات گیرنده
            </Button>
          </Col>
        </Form>
      </div>
    </React.Fragment>
  );
}
