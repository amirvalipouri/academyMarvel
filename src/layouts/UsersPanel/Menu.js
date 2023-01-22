import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import MenuContent from "./MenuContent";

export default function Menu({ show = false, onHide = () => {} }) {
  const sidebar = useRef();
  const location = useLocation();
  const handleShow = () => {
    sidebar.current.classList.toggle("active", show);
  };
  const handleLocation = () => {
    onHide(false);
  };
  useEffect(handleShow, [show]);
  useEffect(handleLocation, [location.pathname]);
  return (
    <div
      ref={sidebar}
      className="sidebar-toggle d-flex d-lg-none position-fixed top-0 left-0 w-100 h-100 overflow-hidden p-0"
    >
      <div className="menu bg-white bg-opacity-90 d-flex flex-column overflow-auto gap-3 h-100 p-2">
        <MenuContent />
      </div>
      <button
        className="hide-btn flex-1 opacity-0"
        onClick={() => onHide(false)}
      ></button>
    </div>
  );
}
