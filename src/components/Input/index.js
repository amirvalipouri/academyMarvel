import React, { useEffect, useRef, useState } from "react";
import { FormControl } from "react-bootstrap";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { showNumber, showFileName } from "../../methods";
import { rules as basicRules } from "../../constants";
import { Modal, Button } from "..";
import "./index.scss";
import { moment } from "../../boot";
function Input(
  {
    label = "",
    value = "",
    setValue = () => { },
    onClick = () => { },
    rules = basicRules.required,
    type = "text",
    append = "",
    prepend = "",
    as = "input",
    placeholder = null,
    readOnly = false,
    minDate = null,
    maxDate = null,
    dir = "rtl",
    accept = "",
    disabled = false,
    className = "",
    cancelBtn = false,
    clear = false,
    ...props
  },
  ref
) {
  const input = useRef();
  const inputFileRef = useRef();
  const message = useRef();
  const [focused, setFocused] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isDate = type === "date";
  const isFile = type === "file";
  const isPassword = type === "password";
  const hasFile = isFile && !!value.length;
  const checkValid = () => {
    input.current.isValid = () => {
      // if (disabled || readOnly) return true;
      return rules.every((rule) => {
        const isValid = rule(value ?? "");
        if (isValid !== true) {
          message.current.innerText = isValid;
          return false;
        }
        message.current.innerText = "";
        return true;
      });
    };
  };
  const handleFocused = () => {
    input.current.classList.toggle("focused", focused);
  };
  const handleFormatDate = ({ day, month, year }) => {
    const date = `${year}/${showNumber(month.number)}/${showNumber(day)}`;
    return new Date(moment.shamsiToMiladi({ date }));
  };
  const handleChange = (e) => {
    if (isFile) return;
    if (isDate) {
      const date = e.map(handleFormatDate);
      return setValue(date);
    }
    const value = e.target?.value;
    setValue(value);
  };
  const handleFocus = () => {
    isDate && setShowCalendar(true);
    setFocused(true);
  };
  const handleBlur = () => {
    setFocused(false);
  };
  const handleReadOnly = () => {
    if (isDate || isFile) return true;
    return readOnly || disabled;
  };
  const handleType = () => {
    if (isDate || isFile) return "text";
    if (isPassword) return showPassword ? "text" : "password";
    return type;
  };
  const handleValue = () => {
    if (isFile) return showFileName(value);
    if (isDate) {
      const isArray = Array.isArray(value);
      const val = isArray ? value : [];
      const date = val.map((date) => moment.miladiToShamsi({ date }));
      return date;
    }
    return value ?? "";
  };
  const clickInputFile = () => {
    inputFileRef.current?.click();
  };
  const removeFile = () => {
    inputFileRef.current.value = "";
    setValue(undefined);
  };
  const clearValue = () => {
    setValue("")
  }
  useEffect(handleFocused, [focused]);
  useEffect(checkValid, [value, rules]);
  return (
    <div ref={input} className="Input position-relative w-100 check-valid">
      {!!label && (
        <span className="text-start d-block w-100 fs-6 text-dark-blue me-2 mb-2">
          {label}
        </span>
      )}
      <div
        aria-expanded={props["aria-expanded"]}
        className={`input-box ${className}`}
        ref={ref}
      >
        {isFile && (
          <button
            type="button"
            className="input-group-text bi bi-images"
            onClick={clickInputFile}
          />
        )}
        {isPassword && (
          <i
            className={`bi bi-eye${showPassword ? "-slash" : ""
              } input-group-text fs-5 cursor-pointer`}
            onClick={() => setShowPassword((p) => !p)}
          />
        )}

        {hasFile && (
          <button
            type="button"
            className="input-group-text bi bi-x-lg text-danger"
            onClick={removeFile}
          />
        )}
        {(clear && !!value ) && (
          <button
            type="button"
            onClick={clearValue}
            className="bi bi-x-lg text-danger fs-5 border"
          />
        )}{" "}
        {append}
        <FormControl
          as={as}
          dir={dir}
          type={handleType()}
          readOnly={handleReadOnly()}
          value={handleValue() ?? ""}
          placeholder={placeholder ?? `${label} را وارد کنید`}
          onChange={handleChange}
          onClick={onClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="border border-light-gray"
        />

        {prepend}

      </div>
      {isFile && (
        <input
          ref={inputFileRef}
          type="file"
          accept={accept}
          className="d-none"
          onChange={({ target }) => setValue(target.files)}
        />
      )}
      {!!rules.length && (
        <p
          ref={message}
          className="message w-100 d-block text-danger text-start px-2 mb-0"
        ></p>
      )}
      {isDate && (
        <Modal title={label} show={showCalendar} onHide={setShowCalendar}>
          <Calendar
            className="mx-auto"
            range={true}
            calendar={persian}
            locale={persian_fa}
            format="YYYY/MM/DD"
            minDate={minDate}
            maxDate={maxDate}
            value={value ?? ""}
            onChange={handleChange}
          />

          <div className="flex-center mt-3 gap-1">


            {cancelBtn &&
              <Button variant="danger" onClick={() => setValue([])}>
                حذف مقدار
              </Button>
            }


            <Button onClick={() => setShowCalendar(false)}>بستن</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default React.forwardRef(Input);
