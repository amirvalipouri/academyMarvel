import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { axios } from "../../../boot";
import { Table } from "../../../components";
import { convertTime, showNumber } from "../../../methods";
export default function Exams() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [exams, setExams] = useState([]);
  const getExams = () => {
    const courseId = query.get("courseId");
    const url = "/admins/exams";
    const ByCourseIdUrl = `/admins/exams/course/${courseId}`;
    axios.get(courseId ? ByCourseIdUrl : url).then(({ data }) => {
      setExams(data.data);
    });
  };
  useEffect(getExams, []);
  return (
    <Row>
      <div className="col-12 d-flex justify-content-end">
        <Link
          to="new"
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>نام آزمون</th>
            <th>توضیحات آزمون</th>
            <th>مدت زمان</th>
            <th>تعداد سوالات</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam._id} onClick={() => navigate(exam._id)}>
              <td>{exam.title}</td>
              <td>{exam.description}</td>
              <td>{convertTime(exam.timeout)}</td>
              <td>{showNumber(exam.questions?.length)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  );
}
