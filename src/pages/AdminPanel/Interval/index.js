import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ButtonGroup, Col } from "react-bootstrap";
import cloneDeep from "lodash/cloneDeep";
import { axios } from "../../../boot";
import { toast } from "../../../methods";
import { Input, Form, Button, Select } from "../../../components";
import { rules } from "../../../constants";

export default function Interval() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
  const [coursesIntervals, setCoursesIntervals] = useState([]);
  const [courses, setCourses] = useState([]);
  const isNewInterval = params.intervalId === "new";
  const formControls = [
    {
      label: "نام بازه",
      state: "title",
    },
    {
      label: "تاریخ شروع و پایان",
      state: "date",
      type: "date",
    },
    {
      label: "ظرفیت (نفر)",
      state: "capacity",
      type: "number",
    },
    {
      label: "توضیحات",
      state: "description",
      as: "textarea",
    },
  ];
  const coursesFormControls = [
    {
      tag: Select,
      label: "دوره",
      state: "courseId",
      items: courses,
    },
    {
      label: "حداقل امتیاز مورد نیاز",
      state: "minScore",
      type: "number",
    },
    {
      label: "تاریخ شروع و پایان",
      state: "date",
      type: "date",
    },
  ];
  const getData = () => {
    if (!isNewInterval) {
      const url = `/admins/registers/${params.intervalId}`;
      axios.get(url).then((res) => {
        const data = { ...res.data };
        data.date = [data.registerStartDate, data.registerEndDate];
        data.capacity = String(data.capacity);
        data.courses = data.courses.map((data) => ({
          ...data,
          minScore: String(data.minScore),
          date: [data.startDate, data.endDate],
        }));
        setData(data);
        setCoursesIntervals(data.courses);
      });
    }
  };
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
  const addNewInterval = () => {
    const url = "/admins/registers";
    const body = cloneDeep({ ...data, courses: coursesIntervals });
    body.registerStartDate = body.date[0];
    body.registerEndDate = body.date[1];
    body.courses = body.courses.map((course) => {
      course.startDate = course.date[0];
      course.endDate = course.date[1];
      delete course.date;
      return course;
    });
    delete body.date;
    axios.post(url, body).then(() => {
      toast({});
      navigate("/admin/intervals", { replace: true });
    });
  };
  const updateInterval = () => {
    const url = "/admins/registers";
    const body = cloneDeep({ ...data, courses: coursesIntervals });
    body.registerStartDate = body.date[0];
    body.registerEndDate = body.date[1];
    body.courses = body.courses.map((course) => {
      course.startDate = course.date[0];
      course.endDate = course.date[1];
      delete course.date;
      return course;
    });
    delete body.date;
    delete body.createdAt;
    delete body.modifiedAt;
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const deleteInterval = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (window.confirm(message)) {
      const url = "/admins/registers";
      const body = { data: { _id: params.intervalId } };
      axios.delete(url, body).then(() => {
        toast({});
        navigate("/admin/intervals", { replace: true });
      });
    }
  };
  const addNewCourseInterval = () => {
    const defaultCourseInterval = {
      courseId: "",
      minScore: "",
      date: ["", ""],
    };
    setCoursesIntervals((p) => [...p, defaultCourseInterval]);
  };
  const checkIntervalsLength = () => {
    if (coursesIntervals.length === 0) {
      const text = "لظفا یک دوره اضافه کنید";
      toast({ text, type: "error" });
      return () => {};
    }
    return isNewInterval ? addNewInterval() : updateInterval();
  };
  useEffect(getCourses, []);
  useEffect(getData, []);
  return (
    <Form onSubmit={checkIntervalsLength} className="row">
      {formControls.map((props, index) => (
        <Col key={index} xs="12" md={index === 3 ? "12" : "6"}>
          <Input
            {...props}
            value={data[props.state]}
            setValue={(val) => setData((p) => ({ ...p, [props.state]: val }))}
          />
        </Col>
      ))}
      <h5 className="text-center">دوره‌ها</h5>
      {coursesIntervals.map((item, index) => (
        <React.Fragment key={index}>
          <h6 className="col-12 col-md-6">
            بازه شماره {index + 1}
            <button
              type="button"
              onClick={() =>
                setCoursesIntervals((p) => {
                  const prev = [...p];
                  prev.splice(index, 1);
                  return prev;
                })
              }
              className="bi bi-x-lg fs-5 d-inline-flex flex-center ms-2 text-danger"
            />
          </h6>
          {coursesFormControls.map((props, i) => (
            <Col key={i} xs="12" md="6">
              {React.createElement(props.tag ?? Input, {
                ...props,
                value: item[props.state],
                setValue: (val) =>
                  setCoursesIntervals((p) => {
                    const courses = cloneDeep(p);
                    courses[index][props.state] = val;
                    return courses;
                  }),
              })}
            </Col>
          ))}
        </React.Fragment>
      ))}
      <div className="col-12">
        <button
          type="button"
          className="bi bi-plus-lg text-success"
          onClick={addNewCourseInterval}
        >
          افزودن دوره جدید
        </button>
      </div>
      <div className="col-12 d-flex flex-center">
        <ButtonGroup>
          {!isNewInterval && (
            <Button variant="danger" onClick={deleteInterval}>
              حذف
            </Button>
          )}
          <Button type="submit">ثبت</Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}
