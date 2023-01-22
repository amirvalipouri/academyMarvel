import React, { useEffect, useState } from "react";
import { ButtonGroup, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { axios } from "../../../boot";
import { Button, Form, Input, Select, SelectTags } from "../../../components";
import { blogStatus, rules } from "../../../constants";
import { objectSelect, toast } from "../../../methods";
import AddNewInfo from "./AddNewInfo";
import Img from "./Img";

export default function Product() {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const isNew = params.id === "new";
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  // const [sizes, setSizes] = useState([]);
  const getCategories = () => {
    const url = `/admins/pub/shop/categories`;
    axios.get(url).then(({ data }) => {
      const categories = data.data.map((e) => ({
        name: e.title_fa,
        id: e.title,
      }));
      setCategories(categories);
    });
  };
  // const getSizes = () => {
  //   const url = "/admins/pub/shop/boxes";
  //   axios.get(url).then(({ data }) => {
  //     const sizes = data.map((e) => ({
  //       id: e.ID,
  //       name: e.Name,
  //     }));
  //     setSizes(sizes);
  //   });
  // };
  const info = data.info ?? [];
  const getProduct = () => {
    if (isNew) return;
    const url = `/admins/pub/shop/products/${productId}`;
    axios.get(url).then((res) => {
      console.log(res)
      const data = { ...res.data };
      data.date = [data.startDate, data.endDate];
      data.category = data.category?.map((e) => e.title);
      setData(data);
    });
  };
  const removeInfoItem = (index = 0) => {
    setData((p) => {
      const data = { ...p };
      const newInfo = data.info;
      newInfo.splice(index, 1);
      return data;
    });
  };
  const addProduct = () => {
    const url = "/admins/pub/shop/products";
    const body = { ...data };
    [body.startDate, body.endDate] = body.date;
    formControls
      .filter((e) => e.type === "number")
      .map((e) => e.state)
      .forEach((key) => {
        body[key] = +body[key];
      });
    delete body.date;
    delete body.count;
    axios.post(url, body).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const updateProduct = () => {
    const keys = formControls.map((e) => e.state);
    const url = "/admins/pub/shop/products";
    const body = objectSelect(data, [...keys, "info", "category"]);
    [body.startDate, body.endDate] = body.date;
    formControls
      .filter((e) => e.type === "number")
      .map((e) => e.state)
      .forEach((key) => {
        body[key] = +body[key];
      });
    body._id = productId;
    delete body.date;
    delete body.count;
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const removeProduct = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (!window.confirm(message)) return;
    const url = "/admins/pub/shop/products";
    const body = { data: { _id: productId } };
    axios.delete(url, body).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const formControls = [
    {
      label: "نام (انگلیسی)",
      state: "title",
    },
    {
      label: "نام (فارسی)",
      state: "title_fa",
    },
    {
      label: "قیمت (تومان)",
      state: "price",
      type: "number",
    },
    {
      label: "قیمت (USD)",
      state: "priceUsd",
      type: "number",
    },
    {
      label: "درصد تخفیف (تومان)",
      state: "off",
      type: "number",
    },
    {
      label: "درصد تخفیف (USD)",
      state: "offUsd",
      type: "number",
    },
    {
      label: "وزن محصول (گرم)",
      state: "weight",
      type: "number",
    },
    {
      label: "تاریخ شروع و پایان",
      state: "date",
      type: "date",
    },
    {
      tag: Select,
      label: "وضعیت",
      state: "status",
      items: blogStatus,
    },
    !isNew && {
      label: "تعداد",
      state: "count",
      type: "number",
      readOnly: true,
      append: (
        <Link to="refill" className="btn btn-primary">
          شارژ
        </Link>
      ),
    },
    // {
    //   tag: Select,
    //   label: "اندازه",
    //   state: "sizeId",
    //   type: "number",
    //   items: sizes,
    // },
    {
      as: "textarea",
      label: "توضیحات",
      state: "description",
    },
  ].filter(Boolean);
  useEffect(getProduct, []);
  useEffect(getCategories, []);
  // useEffect(getSizes, []);
  return (
    <React.Fragment>
      {!isNew && <Img productId={productId} img={data.img} />}
      <Form className="row" onSubmit={isNew ? addProduct : updateProduct}>
        {formControls.map((e) => (
          <Col
            key={e.state}
            xs="12"
            md={e.as === "textarea" ? "12" : "6"}
            lg={e.as === "textarea" ? "12" : "4"}
          >
            {React.createElement(e.tag ?? Input, {
              ...e,
              value: data[e.state],
              setValue: (val) => setData((p) => ({ ...p, [e.state]: val })),
            })}
          </Col>
        ))}
        <div className="col-12 d-flex flex-column flex-center">
          <h5 className="text-center mb-3">مقدارهای اضافی</h5>
          <Button outline size="sm" onClick={() => setShowModal(true)}>
            اضافه کردن مقدار جدید
          </Button>
        </div>
        {info.map((e, i) => (
          <Col key={i} xs="12" md="6" lg="4">
            <Input
              prepend={
                <button
                  type="button"
                  onClick={() => removeInfoItem(i)}
                  className="bi bi-x-lg input-group-text text-danger"
                />
              }
              label={e.label}
              rules={rules.required}
              value={e.value}
              setValue={(val) =>
                setData((p) => {
                  const data = { ...p };
                  const newInfo = [...data.info];
                  newInfo[i].value = val;
                  return data;
                })
              }
            />
          </Col>
        ))}
        <h5 className="text-center mb-3">دسته‌بندی‌ها</h5>
        <Col xs="12" md="6">
          <SelectTags
            label="انتخاب دسته‌بندی"
            rules={rules.required}
            items={categories}
            value={data.category}
            setValue={(val) =>
              setData((p) => {
                const data = { ...p };
                data.category = val;
                return data;
              })
            }
          />
        </Col>
        <div className="col-12 d-flex flex-center">
          <ButtonGroup>
            {!isNew && (
              <Button variant="danger" onClick={removeProduct}>
                حذف
              </Button>
            )}
            <Button type="submit">ثبت</Button>
          </ButtonGroup>
        </div>
      </Form>
      <AddNewInfo
        show={showModal}
        onHide={setShowModal}
        submit={(infoItem) =>
          setData((p) => ({ ...p, info: [...info, infoItem] }))
        }
      />
    </React.Fragment>
  );
}
