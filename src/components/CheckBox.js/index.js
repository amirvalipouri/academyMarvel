import { useEffect, useRef } from "react";
import "./index.scss";
export default function CheckBox({
  label = "",
  value = undefined,
  setValue = () => {},
  rules = [],
  btnLabel = ["بله", "خیر"],
}) {
  const input = useRef(null);
  const message = useRef(null);
  const btns = [
    {
      icon: "bi bi-check-lg",
      value: true,
      label: btnLabel[0],
      color: "text-success",
    },
    {
      icon: "bi bi-x-lg",
      value: false,
      label: btnLabel[1],
      color: "text-danger",
    },
  ];
  const checkValid = () => {
    input.current.isValid = () => {
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
  const isActive = (el) => {
    return value === el.value ? `active fw-bold ${el.color}` : "text-secondary";
  };
  useEffect(checkValid, [value, rules]);
  return (
    <div className="CheckBox">
      <span className="text-start d-block w-100 fs-6 text-dark-blue me-2 mb-2">
        {label}
      </span>
      <div
        ref={input}
        className="button-box d-flex flex-center gap-2 check-valid"
      >
        {btns.map((e) => (
          <button
            key={String(e.value)}
            type="button"
            className={`text-start flex-1 rounded-2 ${isActive(e)}`}
            onClick={() => setValue(e.value)}
          >
            <i className={`${e.icon} fs-5`} />
            {e.label}
          </button>
        ))}
      </div>
      <p
        ref={message}
        className="message w-100 d-block text-danger text-start px-2 mb-0"
      ></p>
    </div>
  );
}
