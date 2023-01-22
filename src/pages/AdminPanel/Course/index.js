import React, { useEffect, useState } from "react";
import { ButtonGroup, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "../../../components";
import { accept, rules } from "../../../constants";
import { axios } from "../../../boot";
import { toast } from "../../../methods";
export default function Course() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const isNewCourse = params.courseId === "new";

  const fromControls = [
    {
      label: "موضوع",
      state: "title",
    },
    // {
    //   label: "شماره دوره",
    //   state: "index",
    //   type: "number",
    // },
    {
      label: "نام مدرس",
      state: "instructor",
    },
    {
      label: "حداقل زمان مورد نیاز(ساعت)",
      state: "minTime",
      type: "number",
    },
    {
      label: "حداکثر زمان مورد نیاز(ساعت)",
      state: "maxTime",
      type: "number",
      rules: [
        (val = "") => +val > +data.minTime || "مفدار باید بزرگتر از حداقل باشد",
      ],
    },
    {
      label: "ویدیو نمونه",
      state: "video",
      type: "file",
      accept: accept.video,
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

  const getData = () => {
    if (!isNewCourse) {
      const url = `/admins/courses/${params.courseId}`;
      axios.get(url).then(({ data }) => {
        setData(data);
      });
    }
  };
  const addNewCourse = () => {
    const url = "/admins/courses";
    const body = new FormData();
    const files = ["video", "thumbnail"];
    Object.keys(data).forEach((key) => {
      if (files.includes(key)) {
        body.append(key, data[key][0]);
      } else {
        body.append(key, data[key]);
      }
    });
    axios.post(url, body).then(() => {
      toast({});
      navigate("/admin/courses", { replace: true });
    });
  };
  const changeCourse = () => {
    const url = "/admins/courses";
    const body = new FormData();
    const bodyData = { ...data };
    delete bodyData.createdAt;
    delete bodyData.modifiedAt;
    delete bodyData.index;
    bodyData.video = bodyData.video[0];
    if (body.thumbnail) {
      bodyData.thumbnail = bodyData.thumbnail[0];
    }
    Object.keys(bodyData).forEach((key) => {
      body.append(key, bodyData[key]);
    });
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const deleteUser = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (window.confirm(message)) {
      const url = "/admins/courses";
      const body = { _id: params.courseId };
      axios.delete(url, { data: body }).then(() => {
        toast({});
        navigate("/admin/courses", { replace: true });
      });
    }
  };

  useEffect(getData, []);
  return (
    <Form onSubmit={isNewCourse ? addNewCourse : changeCourse} className="row">
      <h5 className="text-center col-12">
        {isNewCourse ? "اضافه کردن دوره جدید" : "اطلاعات دوره"}
      </h5>
      {fromControls.map((props, index) => (
        <Col key={index} xs="12" md={index === 6 ? "12" : "6"}>
          <Input
            {...props}
            value={data[props.state]}
            setValue={(val) => setData((p) => ({ ...p, [props.state]: val }))}
          />
        </Col>
      ))}
      <div className="col-12 d-flex gap-1 flex-column flex-center">
        <Button type="submit">ثبت</Button>
        <ButtonGroup>
          {!isNewCourse && (
            <React.Fragment>
              <Link
                className="Button btn btn-dark"
                to={{
                  pathname: "/admin/sessions",
                  search: `courseId=${params.courseId}`,
                }}
              >
                جلسات دوره
              </Link>
              <Button variant="danger" onClick={deleteUser}>
                حذف
              </Button>
              <Link
                className="Button btn btn-dark"
                to={{
                  pathname: "/admin/exams",
                  search: `courseId=${params.courseId}`,
                }}
              >
                آزمون‌های دوره
              </Link>
            </React.Fragment>
          )}
        </ButtonGroup>
      </div>
    </Form>
  );
}
