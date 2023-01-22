import { useEffect, useRef } from "react";
import "./index.scss";
export default function PrintModal({
  show = true,
  onHide = () => {},
  type = "primary",
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
      className="Printmodal text-center position-fixed  p-2 transition-500"
    >
      <button
        type="button"
        className="hide-btn"
        onClick={() => onHide(false)}
      />
      <div
        className={`dialog modal-dialog border border-light-gray bg-white rounded shadow-sm position-relative transition overflow-auto modal-${size}`}
      >
        <div className="body p-3">{children}</div>
      </div>
    </div>
  );
}
