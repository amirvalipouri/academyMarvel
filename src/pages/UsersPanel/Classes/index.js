import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { NotFound, Table, Video } from "../../../components";
import { axios, moment } from "../../../boot";
import { indexTitles } from "../../../constants";
import { convertTime, source } from "../../../methods";

export default function Classes() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [classes, setClasses] = useState([]);
  const getCourses = () => {
    const url = "/courses";
    axios.get(url).then(({ data }) => {
      setCourses(data);
      setActiveCourse(data[0]);
    });
  };
  const getActiveCourse = () => {
    if (!activeCourse) return;
    setClasses([]);
    const url = `/courses/${activeCourse.courseId}`;
    axios.get(url).then(({ data }) => {
      setClasses(data);
    });
  };
  const showActiveCourseInfo = () => {
    const { instructor, minTime, maxTime, modifiedAt } = activeCourse ?? {};
    return [
      // {
      //   icon: "tags-fill",
      //   title: "دسته‌بندی",
      //   value: "ارزهای دیجیتال",
      // },
      {
        icon: "person-square",
        title: "مدرس",
        value: instructor,
      },
      {
        icon: "alarm-fill",
        title: "مدت زمان",
        value: `${minTime} الی ${maxTime} ساعت`,
      },
      // {
      //   icon: "basket3-fill",
      //   title: "تعداد خرید",
      //   value: "345",
      // },
      {
        icon: "calendar2-week",
        title: "تاریخ بروزرسانی",
        value: moment.miladiToShamsi({ date: modifiedAt }),
      },
    ];
  };
  useEffect(getCourses, []);
  useEffect(getActiveCourse, [activeCourse]);
  return (
    <Row className="align-items-stretch">
      {!!courses.length ? (
        <React.Fragment>
          <Col xs="12" lg="7">
            <div className="wrapper h-100">
              <h1 className="h4 mb-3">{activeCourse?.title}</h1>
              <div className="opacity-5 d-flex flex-column row-gap-3">
                {showActiveCourseInfo().map((item, index) => (
                  <p
                    key={index}
                    className="d-flex align-items-center col-gap-2"
                  >
                    <i className={`text-primary fs-4 bi bi-${item.icon}`} />
                    <span className="text-primary">{item.title}:</span>
                    {item.value}
                  </p>
                ))}
                <p className="white-space-pre-wrap">
                  {activeCourse?.description}
                </p>
              </div>
            </div>
          </Col>
          <Col xs="12" lg="5">
            <div className="wrapper h-100">
              {activeCourse && (
                <Video
                  height="100%"
                  thumbnail={source(activeCourse.thumbnail)}
                  sources={[
                    {
                      src: source(activeCourse.videoLq),
                      size: 720,
                    },
                    {
                      src: source(activeCourse.videoHq),
                      size: 480,
                    },
                  ]}
                />
              )}
            </div>
          </Col>
          <Col xs="12">
            <div className="wrapper">
              <div className="d-flex align-items-center gap-3 w-100 overflow-auto py-2">
                {courses.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCourse(item)}
                    className={`text-start text-primary transition border-bottom ${
                      item.courseId === activeCourse?.courseId
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    دوره {indexTitles[index + 1]}
                  </button>
                ))}
              </div>
              <Table>
                <thead>
                  <tr>
                    <td>شماره جلسه</td>
                    <td>نام جلسه</td>
                    <td>مدت جلسه</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((item) => (
                    <tr
                      key={item._id}
                      onClick={() =>
                        navigate(item._id, { state: { activeClass: item } })
                      }
                    >
                      <td>
                        <div className="w-fit d-flex flex-center col-gap-2">
                          <span className="px-2 py-1 rounded bg-primary">
                            <i className="text-white fs-5 bi bi-file-earmark-play-fill" />
                          </span>
                          جلسه {indexTitles[item.index]}
                        </div>
                      </td>
                      <td>{item.title}</td>
                      <td>
                        <div className="w-fit d-flex flex-center col-gap-2">
                          <i className="bi bi-alarm-fill fs-5 text-primary" />
                          {convertTime(item.duration)}
                        </div>
                      </td>
                      <td>
                        <span className={`text-success`}>مشاهده آموزش</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </React.Fragment>
      ) : (
        <NotFound />
      )}
    </Row>
  );
}
