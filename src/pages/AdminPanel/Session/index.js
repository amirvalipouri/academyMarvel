import React, { useEffect, useState } from "react";
import { ButtonGroup, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import cloneDeep from "lodash/cloneDeep";
import { axios } from "../../../boot";
import { Form, Input, Select, Button } from "../../../components";
import { accept, rules } from "../../../constants";
import { toast } from "../../../methods";
export default function Session() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const isNewSession = params.sessionId === "new";
  const formControls = [
    {
      label: "نام جلسه",
      state: "title",
    },
    {
      label: "شماره جلسه",
      state: "index",
      type: "number",
    },
    {
      label: "نام مدرس",
      state: "instructor",
    },
    {
      tag: Select,
      label: "انتخاب دوره",
      state: "courseId",
      items: courses,
    },
    {
      label: "ویدیو",
      state: "video",
      type: "file",
      accept: accept.video,
    },
    {
      label: "فایل زیر نویس(اختیاری)",
      state: "faSubtitle",
      type: "file",
      accept: accept.subtitle,
      rules: rules.optional,
    },
    {
      label: "عکس پیش‌نمایش(اختیاری)",
      state: "thumbnail",
      type: "file",
      accept: accept.img,
      rules: rules.optional,
    },
    {
      label: "توضیحات",
      state: "description",
      as: "textarea",
      rules: rules.description,
    },
  ];
  const files = ["video", "faSubtitle", "thumbnail"];

  const getCourses = () => {
    const url = "/admins/courses";
    axios.get(url).then(({ data }) => {
      const items = data.data.map((item) => ({
        id: item._id,
        name: item.title,
      }));
      setCourses(items);
    });
  };
  const getData = () => {
    if (!isNewSession) {
      const url = `/admins/sessions/${params.sessionId}`;
      axios.get(url).then((res) => {
        const data = cloneDeep(res.data);
        data.video = data.videoHq;
        setData(data);
      });
    }
  };
  const addNewSession = () => {
    const url = "/admins/sessions";
    const body = new FormData();
    Object.keys(data).forEach((key) => {
      const isFile = files.includes(key);
      body.append(key, isFile ? data[key][0] : data[key]);
    });
    axios.post(url, body).then(() => {
      toast({});
      navigate("/admin/sessions", { replace: true });
    });
  };
  const changeSession = () => {
    const url = "/admins/sessions";
    const body = new FormData();
    const unnecessaryKeys = [
      "modifiedAt",
      "createdAt",
      "videoHq",
      "videoLq",
      "exam",
      "course",
      "duration",
    ];
    Object.keys(data)
      .filter((e) => !unnecessaryKeys.includes(e))
      .forEach((key) => {
        const isFile = files.includes(key);
        if (isFile) {
          typeof data[key] !== "string" && body.append(key, data[key][0]);
        } else {
          body.append(key, data[key]);
        }
      });
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const deleteSession = () => {
    const message = "آیا از درخواست خود اطمینان دارید؟";
    if (window.confirm(message)) {
      const url = "/admins/sessions";
      const body = { data: { _id: params.sessionId } };
      axios.delete(url, body).then(() => {
        toast({});
        navigate("/admin/sessions", { replace: true });
      });
    }
  };

  useEffect(getData, []);
  useEffect(getCourses, []);
  return (
    <Form
      onSubmit={isNewSession ? addNewSession : changeSession}
      className="row"
    >
      {formControls.map((props, index) => (
        <Col key={index} xs="12" md={index === 7 ? "12" : "6"}>
          {React.createElement(props.tag ?? Input, {
            ...props,
            value: data[props.state],
            setValue: (val) => setData((p) => ({ ...p, [props.state]: val })),
          })}
        </Col>
      ))}
      <div className="col-12 d-flex flex-center">
        <ButtonGroup>
          {!isNewSession && (
            <Button variant="danger" onClick={deleteSession}>
              حذف
            </Button>
          )}
          <Button type="submit">ثبت</Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}
