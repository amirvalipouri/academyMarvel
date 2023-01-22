import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonGroup, Col } from "react-bootstrap";
import { Form, Button, Input, Select } from "../../../components";
import { priorityValues, blogStatus, rules, accept } from "../../../constants";
import { objectSelect, toast } from "../../../methods";
import { axios } from "../../../boot";
export default function FreeTutorial() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
  const [categories, setCategories] = useState([]);
  const isNew = params.id === "new";
  const formControls = [
    {
      label: "موضوع",
      state: "title",
    },
    {
      tag: Select,
      label: "وضعیت",
      state: "status",
      items: blogStatus,
    },
    {
      tag: Select,
      label: "دسته بندی",
      state: "category",
      items: categories,
    },
    {
      tag: Select,
      label: "سطح اولویت",
      state: "priority",
      items: priorityValues,
    },
    {
      label: "شناسه index (اختیاری)",
      state: "index",
      type: "number",
      rules: rules.optional,
    },
    {
      label: "پیش نمایش(اختیاری)",
      state: "thumbnail",
      type: "file",
      accept: accept.img,
      rules: rules.optional,
    },
    isNew && {
      label: "ویدیو",
      state: "video",
      type: "file",
      accept: accept.video,
    },
    {
      as: "textarea",
      label: "توضیحات",
      state: "description",
    },
  ].filter(Boolean);
  const getCategories = () => {
    const url = "/admins/pub/categories";
    axios.get(url).then((res) => {
      const data = res.data.data.map((e) => ({
        id: e.title,
        name: e.title_fa,
      }));
      setCategories(data);
    });
  };
  const getData = () => {
    if (isNew) return;
    const url = `/admins/pub/videos/${params.id}`;
    axios.get(url).then(({ data }) => {
      setData(data);
    });
  };
  const addNewVideo = () => {
    const url = "/admins/pub/videos";
    const body = new FormData();
    const files = ["thumbnail", "video"];
    Object.keys(data).forEach((key) => {
      if (files.includes(key)) {
        data[key][0] && body.append(key, data[key][0]);
      } else {
        data[key] && body.append(key, data[key]);
      }
    });
    axios.post(url, body).then(() => {
      toast({});
      navigate("/admin/free-tutorials", { replace: true });
    });
  };
  const updateVideo = () => {
    const keys = formControls
      .filter((e) => !["thumbnail"].includes(e.state))
      .map((e) => e.state);
    const url = `/admins/pub/videos`;
    const body = objectSelect(data, keys);
    body._id = params.id;
    body.index = String(body.index);
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const deleteVideo = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (!window.confirm(message)) return;
    const url = `/admins/pub/videos`;
    const body = { data: { _id: params.id } };
    axios.delete(url, body).then(() => {
      navigate("/admin/free-tutorials", { replace: true });
      toast({});
    });
  };
  const updateThumbnail = () => {
    if (isNew) return;
    if (typeof data.thumbnail !== "object") return;
    const url = "/admins/pub/videos/thumbnail";
    const body = new FormData();
    body.set("thumbnail", data.thumbnail[0]);
    body.set("videoId", params.id);
    axios.post(url, body).then(() => {
      toast({});
    });
  };
  useEffect(getCategories, []);
  useEffect(getData, []);
  useEffect(updateThumbnail, [data.thumbnail]);
  return (
    <Form className="row" onSubmit={isNew ? addNewVideo : updateVideo}>
      {formControls.map((item, index) => (
        <Col key={index} xs="12" lg={item.state === "description" ? "12" : "6"}>
          {React.createElement(item.tag ?? Input, {
            ...item,
            value: data[item.state],
            setValue: (val) => setData((p) => ({ ...p, [item.state]: val })),
          })}
        </Col>
      ))}
      <div className="col-12 d-flex flex-center">
        <ButtonGroup>
          {!isNew && (
            <Button variant="danger" onClick={deleteVideo}>
              حذف
            </Button>
          )}
          <Button type="submit">ثبت</Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}
