import { useEffect, useState } from "react";
import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { NotFound, Table } from "../../../components";
import { axios } from "../../../boot";
import { indexTitles } from "../../../constants";
import { convertTime } from "../../../methods";
import { useNavigate } from "react-router-dom";

export default function Exams() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const getExams = () => {
    const url = "/exams";
    axios.get(url).then(({ data }) => {
      setExams(data.data);
    });
  };
  useEffect(getExams, []);
  return (
    <div className="bg-white rounded shadow-sm p-2">
      <Row className="justify-content-between">
        <h1 className="h6 col-12 col-md-6">سر فصل دوره شما</h1>
        <Col xs="12" md="6" lg="4">
          <InputGroup>
            <FormControl placeholder="جست و جو کنید" />
            <InputGroup.Text className="bg-white">
              <i className="bi bi-search" />
            </InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr className="fs-7 text-secondary">
            <td>شماره آزمون</td>
            <td>نام آزمون</td>
            <td>مدت زمان</td>
            <td>نمره</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={exam._id} onClick={() => navigate(exam._id)}>
              <td>
                <div className="w-fit d-flex flex-center gap-2">
                  <span className="px-2 py-1 rounded bg-primary">
                    <i className="text-white fs-5 bi bi-file-earmark-play-fill" />
                  </span>
                  آزمون {indexTitles[index + 1]}
                </div>
              </td>
              <td>{exam.title}</td>
              <td>{convertTime(exam.timeout)}</td>
              <td>-</td>
              <td>
                <button className="btn btn-primary">ورود به آزمون</button>
              </td>
            </tr>
          ))}
          {!exams.length && (
            <tr>
              <td colSpan="5">
                <NotFound />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
