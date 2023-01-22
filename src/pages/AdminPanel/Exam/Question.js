import React, { useRef } from "react";
import { Col } from "react-bootstrap";
import cloneDeep from "lodash/cloneDeep";
import { Button, Input } from "../../../components";
import { rules } from "../../../constants";

export default function Question({
  questionIndex = 0,
  question = "",
  options = [...Array(4)].map((e) => ({ text: "", file: undefined })),
  answer = "",
  score = "",
  file = "",
  setQuestions = () => {},
  onDelete = () => {},
}) {
  const inputQuestionRef = useRef(null);
  const optionsInputFileRef = useRef([]);
  const hasFile = !!file;
  const hasOptionFile = (index = 0) => {
    return !!options[index].file;
  };
  const handleSetQuestions = (key = "", value = "") => {
    setQuestions((p) => {
      const questions = cloneDeep(p);
      const question = questions[questionIndex];
      question[key] = value;
      return questions;
    });
  };
  const handleSetOptions = (index, key, value) => {
    setQuestions((p) => {
      const questions = cloneDeep(p);
      const options = questions[questionIndex].options;
      options[index][key] = value;
      return questions;
    });
  };
  const handleSelectOptionFile = (index = 0) => {
    const input = optionsInputFileRef.current[index];
    if (hasOptionFile(index)) {
      input.value = "";
      handleSetOptions(index, "file", "");
    } else {
      input.click();
    }
  };
  const handleSelectFile = () => {
    if (hasFile) {
      inputQuestionRef.current.value = "";
      handleSetQuestions("file", "");
    } else {
      inputQuestionRef.current.click();
    }
  };
  return (
    <React.Fragment>
      <Col xs="12">
        <Input
          as="textarea"
          label={
            <React.Fragment>
              <button
                type="button"
                onClick={() => onDelete(questionIndex)}
                className="bi bi-x-lg ms-1 text-danger"
              />
              {`سوال ${questionIndex + 1}`}
            </React.Fragment>
          }
          rules={rules.required}
          value={question}
          placeholder="متن سوال خود را وارد کنید."
          setValue={(val) => handleSetQuestions("question", val)}
        />
        <button type="button" onClick={handleSelectFile} className="fs-7">
          {hasFile ? (
            <span className="text-danger">
              <i className="bi bi-x-lg ms-1" />
              حذف عکس {file?.name}
            </span>
          ) : (
            <span className="text-primary">
              <i className="bi bi-hand-index-thumb ms-1" />
              انتخاب عکس
            </span>
          )}
        </button>
        <input
          ref={inputQuestionRef}
          type="file"
          className="d-none"
          accept=".jpg, .jpeg, .png,"
          onChange={({ target }) => handleSetQuestions("file", target.files[0])}
        />
      </Col>
      {options.map((option, index) => (
        <Col key={index} xs="12">
          <Input
            label={`گزینه ${index + 1}`}
            rules={rules.required}
            value={option.text}
            setValue={(val) => handleSetOptions(index, "text", val)}
            append={
              <Button
                variant={hasOptionFile(index) ? "danger" : "primary"}
                label={hasOptionFile(index) ? "حذف عکس" : "انتخاب عکس"}
                onClick={() => handleSelectOptionFile(index)}
              />
            }
          />
          <input
            ref={(ref) => (optionsInputFileRef.current[index] = ref)}
            type="file"
            accept=".jpg, .jpeg, .png,"
            onChange={({ target }) =>
              handleSetOptions(index, "file", target.files[0])
            }
            className="d-none"
          />
        </Col>
      ))}
      <Col xs="12" md="6">
        <Input
          label="گزینه جواب"
          rules={rules.answer}
          type="number"
          value={answer}
          setValue={(val) => handleSetQuestions("answer", val)}
        />
      </Col>
      <Col xs="12" md="6">
        <Input
          label="امتیاز"
          rules={rules.score}
          type="number"
          value={score}
          setValue={(val) => handleSetQuestions("score", val)}
        />
      </Col>
    </React.Fragment>
  );
}
