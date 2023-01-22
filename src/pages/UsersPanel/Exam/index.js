import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Button, Radio } from "../../../components";
import { axios } from "../../../boot";
import { convertTime, downloadBase64, toast } from "../../../methods";

export default function Exam() {
  const params = useParams();
  const navigate = useNavigate();
  const [myInterval, setMyInterval] = useState(null);
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState([]);
  const getExam = () => {
    const url = `/exams/${params.id}`;
    axios
      .get(url)
      .then(({ data }) => {
        setQuestions(data);
        setAnswers(data.questions.map(() => ""));
        startTimer();
      })
      .catch(() => {
        navigate("/exams", { replace: true });
      });
    return () => {
      clearInterval(myInterval);
    };
  };
  const startTimer = () => {
    const interval = setInterval(
      () => setQuestions((p) => ({ ...p, timeout: p.timeout - 1 })),
      1000
    );
    setMyInterval(interval);
  };
  const handleTimeout = () => {
    if (questions.timeout <= 0) {
      clearInterval(myInterval);
    }
  };
  const submit = () => {
    const url = "/exams";
    const body = {
      _id: params.id,
      answers: answers.map((i) => +i),
    };
    axios.post(url, body).then(() => {
      const text = "پاسخ‌ها با موفقیت ثبت شد";
      toast({ text });
      navigate("/exams", { replace: true });
    });
  };
  useEffect(getExam, []);
  useEffect(handleTimeout, [questions.timeout]);
  return (
    <React.Fragment>
      <Row className="wrapper mb-3">
        <Col xs="12" lg="6" as="h1" className="h5 m-0">
          {questions.title}
        </Col>
        <Col xs="12" lg="3">
          <i className="bi bi-clock text-primary fs-5 ms-2" />
          مدت زمان آزمون: {convertTime(questions.timeout)}
        </Col>
        <Col xs="12" lg="3">
          <i className="bi bi-check2-circle text-primary fs-5 ms-2" />
          تعداد سوال: {questions.questions?.length ?? "-"} سوال
        </Col>
      </Row>
      <div className="d-flex flex-column row-gap-2 wrapper">
        {questions.questions?.map((item, index) => (
          <React.Fragment key={index}>
            <p className="text-dark h5">
              {`${index + 1}-${item.question} `}
              <span className="text-secondary fs-7">{item.score} امتیاز</span>
              {!!item.file && (
                <button
                  onClick={() => downloadBase64(item.file)}
                  className="fs-6 bi bi-download d-inline-flex flex-center text-primary me-2"
                />
              )}
            </p>
            {item.options.map((option, optionIndex) => (
              <div
                key={optionIndex}
                className="d-flex align-items-center justify-content-start gap-2"
              >
                <span>
                  <Radio
                    name={index}
                    option={optionIndex}
                    label={option.text}
                    value={answers[index]}
                    variant="gold"
                    setValue={(val) => {
                      setAnswers((p) => {
                        const prev = [...p];
                        prev[index] = val;
                        return prev;
                      });
                    }}
                  />
                </span>
                {!!option.file && (
                  <button
                    onClick={() => downloadBase64(option.file)}
                    className="fs-6 bi bi-download d-inline-flex flex-center text-primary me-2"
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
        <Button
          variant="success"
          className="w-fit mx-auto mt-5"
          onClick={submit}
        >
          ثبت پاسخ‌ها
        </Button>
      </div>
    </React.Fragment>
  );
}
