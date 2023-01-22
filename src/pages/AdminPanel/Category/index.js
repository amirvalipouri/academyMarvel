import React, { useEffect, useState } from "react";
import { ButtonGroup, Col } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import { Button, Form, Input, Select } from "../../../components";
import { axios } from "../../../boot";
import { fileToBase64, objectSelect, toast } from "../../../methods";
import { rules, blogStatus, accept } from "../../../constants";

export default function Category() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const isNewCategory = params.id === "new";
  const activeType = location.state?.type ?? "";
  const getCategory = () => {
    if (!isNewCategory) {
      const url = `/admins/pub${activeType}/categories/${params.id}`;
      axios.get(url).then(({ data }) => {
        setData(data);
      });
    }
  };
  const deleteCategory = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (!window.confirm(message)) return;
    const url = `/admins/pub${activeType}/categories`;
    const body = { data: { _id: params.id } };
    axios.delete(url, body).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const addNewCategory = async () => {
    const url = `/admins/pub${activeType}/categories`;
    const body = { ...data };
    body.img && (body.img = await fileToBase64(body.img[0]));
    axios.post(url, body).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const updateCategory = async () => {
    const keys = formControls.map((e) => e.state);
    const url = `/admins/pub${activeType}/categories`;
    const body = objectSelect(data, keys);
    body.img && (body.img = await fileToBase64(body.img[0]));
    body._id = params.id;
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const formControls = [
    {
      label: "موضوع",
      state: "title_fa",
    },
    {
      label: "کلمه کلیدی",
      state: "title",
    },
    !activeType && {
      label: "آیکون (اختیاری)",
      state: "img",
      type: "file",
      accept: accept.icon,
      rules: rules.imgSize,
    },
    {
      tag: Select,
      label: "وضعیت",
      state: "status",
      items: blogStatus,
    },
    {
      as: "textarea",
      label: "توضیحات",
      state: "description",
    },
  ].filter(Boolean);

  useEffect(getCategory, []);
  return (
    <div className="Categories">
      <Form
        className="row"
        onSubmit={isNewCategory ? addNewCategory : updateCategory}
      >
        {formControls.map((item) => (
          <Col
            key={item.state}
            xs="12"
            lg={item.state === "description" ? "12" : "6"}
          >
            {React.createElement(item.tag ?? Input, {
              ...item,
              value: data[item.state],
              setValue: (val) => setData((p) => ({ ...p, [item.state]: val })),
            })}
          </Col>
        ))}
        <div className="col-12 d-flex flex-center">
          <ButtonGroup>
            {!isNewCategory && (
              <Button variant="danger" onClick={deleteCategory}>
                حذف
              </Button>
            )}
            <Button type="submit">ثبت</Button>
          </ButtonGroup>
        </div>
      </Form>
    </div>
  );
}
