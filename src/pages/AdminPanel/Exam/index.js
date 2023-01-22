import React, { useEffect, useState } from "react";
import { ButtonGroup, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import cloneDeep from "lodash/cloneDeep";
import { axios } from "../../../boot";
import { Form, Input, Select, Button } from "../../../components";
import { indexTitles, rules } from "../../../constants";
import { fileToBase64, showNumber, toast } from "../../../methods";
import Question from "./Question";
export default function Exam() {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({});
  const [questions, setQuestions] = useState([]);
  const [sessions, setSessions] = useState([]);
  const isNewExam = params.examId === "new";
  const formControls = [
    {
      label: "نام آزمون",
      state: "title",
    },
    {
      label: "مدت زمان آزمون (دقیقه)",
      state: "timeout",
      type: "number",
    },
    {
      tag: Select,
      label: "جلسه",
      state: "sessionId",
      items: sessions,
    },
    {
      label: "توضیحات",
      state: "description",
      as: "textarea",
    },
  ];
  const handleAddNewQuestion = () => {
    const defaultQuestion = {
      answer: "",
      file: undefined,
      options: [...Array(4)].map((e) => ({ text: "", file: undefined })),
      question: "",
      score: "",
    };
    setQuestions((p) => [...p, defaultQuestion]);
  };
  const handleDeleteQuestion = (index = 0) => {
    setQuestions((p) => {
      const questions = cloneDeep(p);
      questions.splice(index, 1);
      return questions;
    });
  };
  const getSessions = () => {
    const url = "/admins/sessions";
    axios.get(url).then((res) => {
      const sessions = res.data.data.map((item) => ({
        id: item._id,
        name: `جلسه ${indexTitles[item.index]} - ${item.title}`,
      }));
      setSessions(sessions);
    });
  };
  const getData = () => {
    if (!isNewExam) {
      const url = `/admins/exams/${params.examId}`;
      axios.get(url).then((res) => {
        const data = cloneDeep(res.data);
        data.timeout /= 60;
        data.questions = data.questions.map((question) => ({
          ...question,
          answer: +question.answer + 1,
        }));
        setData(data);
        setQuestions(data.questions);
      });
    }
  };
  const addNewExam = async () => {
    const url = "/admins/exams";
    const body = cloneDeep({ ...data, questions });
    body.timeout = String(body.timeout * 60);
    await Promise.all(
      body.questions.map(async (p) => {
        p.answer = String(p.answer - 1);
        p.file = await fileToBase64(p.file);
        await Promise.all(
          p.options.map(async (p) => {
            p.file = await fileToBase64(p.file);
            return p;
          })
        );
        return p;
      })
    );
    axios.post(url, body).then(() => {
      toast({});
      navigate("/admin/exams", { replace: true });
    });
  };
  const changeExam = async () => {
    const url = "/admins/exams";
    const body = cloneDeep({ ...data, questions });
    body.timeout = String(body.timeout * 60);
    body.questions = await Promise.all(
      body.questions.map(async (p) => {
        p.answer = String(p.answer - 1);
        p.file = await fileToBase64(p.file);
        await Promise.all(
          p.options.map(async (p) => {
            p.file = await fileToBase64(p.file);
            return p;
          })
        );
        return p;
      })
    );
    ["deleted", "createdAt", "version", "modifiedAt"].forEach((key) => {
      delete body[key];
    });
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const checkQuestionsLength = () => {
    if (questions.length === 0) {
      const text = "لظفا یک سوال اضافه کنید";
      toast({ text, type: "error" });
      return () => {};
    }
    return isNewExam ? addNewExam() : changeExam();
  };
  const deleteExam = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (window.confirm(message)) {
      const url = "/admins/exams";
      const body = { data: { _id: params.examId } };
      axios.delete(url, body).then(() => {
        toast({});
        navigate("/admin/exams", { replace: true });
      });
    }
  };
  useEffect(getSessions, []);
  useEffect(getData, []);
  return (
    <Form className="row" onSubmit={checkQuestionsLength}>
      {formControls.map((item) => (
        <Col
          key={item.state}
          xs="12"
          md={item.state === "description" ? "12" : "6"}
        >
          {React.createElement(item.tag ?? Input, {
            ...item,
            value: data[item.state],
            setValue: (val) => setData((p) => ({ ...p, [item.state]: val })),
          })}
        </Col>
      ))}
      <h5 className="col-12 text-center">
        سوالات آزمون - {showNumber(questions.length)}
      </h5>
      {questions.map((props, index) => (
        <Question
          key={index}
          questionIndex={index}
          setQuestions={setQuestions}
          onDelete={handleDeleteQuestion}
          {...props}
        />
      ))}
      <div className="col-12">
        <button
          type="button"
          className="bi bi-plus-lg text-success"
          onClick={handleAddNewQuestion}
        >
          افزودن سوال جدید
        </button>
      </div>
      <div className="col-12 d-flex flex-center">
        <ButtonGroup>
          <Button variant="success" type="submit">
            ثبت
          </Button>
          {!isNewExam && (
            <Button variant="danger" onClick={deleteExam}>
              حذف
            </Button>
          )}
        </ButtonGroup>
      </div>
    </Form>
  );
}
