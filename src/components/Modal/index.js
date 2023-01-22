import { useEffect, useRef } from "react";
import "./index.scss";
export default function Modal({
  show = true,
  onHide = () => {},
  type = "primary",
  title = "",
  children = null,
  size = "md",
}) {
  const modal = useRef();
  const handleShow = () => {
    modal.current.classList.toggle("show", show);
  };
  useEffect(handleShow, [show]);
  return (
    <div
      ref={modal}
      className="Modal text-center position-fixed overflow-hidden p-2 transition-500"
    >
      <button
        type="button"
        className="hide-btn"
        onClick={() => onHide(false)}
      />
      <div
        className={`dialog modal-dialog border border-light-gray bg-white rounded shadow-sm position-relative transition overflow-auto modal-${size}`}
      >
        <div className="header w-100 d-flex flex-center text-center">
          <div
            className={`title w-100 border-bottom border-light-gray p-2 fs-6 text-${type}`}
          >
            {title}
          </div>
        </div>
        <div className="body p-3">{children}</div>
      </div>
    </div>
  );
}
