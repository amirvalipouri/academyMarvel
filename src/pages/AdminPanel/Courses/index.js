import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axios } from "../../../boot";
import { CourseCard } from "../../../components";
export default function Courses() {
  const [courses, setCourses] = useState([]);
  const getCourses = () => {
    const url = "/admins/courses";
    axios.get(url).then(({ data }) => {
      setCourses(data.data);
    });
  };
  useEffect(getCourses, []);
  return (
    <Row>
      <div className="col-12 d-flex justify-content-end">
        <Link
          to="new"
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      {courses.map((props) => (
        <Col key={props._id} xs="12" md="6" lg="4" xl="3">
          <CourseCard {...props} />
        </Col>
      ))}
    </Row>
  );
}
