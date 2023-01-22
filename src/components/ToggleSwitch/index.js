import { useEffect, useRef } from "react";
import "./index.scss";
export default function ToggleSwitch({
  value = false,
  setValue = () => {},
  label = null,
  variant = "primary",
}) {
  const toggleSwitch = useRef();
  useEffect(() => {
    toggleSwitch.current.classList.toggle("checked", value);
  }, [value]);
  return (
    <div
      ref={toggleSwitch}
      className="ToggleSwitch d-flex align-items-center col-gap-2"
    >
      <label className="switch position-relative d-block cursor-pointer">
        <input
          checked={value}
          onChange={({ target }) => {
            setValue(target.checked);
          }}
          type="checkbox"
        />
        <span
          className={`slider rounded-pill position-absolute border border-secondary bg-${
            value ? variant : "light"
          } transition`}
        ></span>
        <span
          className={`toggler-btn position-absolute transition rounded-circle bg-${
            value ? "white" : variant
          }`}
        ></span>
      </label>
      <p className={`text-${variant}`}>{label}</p>
    </div>
  );
}
