import { useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navItems } from "../../constants";
import { useShowFullName } from "../../hooks";

export default function Menu({
  show = false,
  onHide = () => {},
  signInPath = "",
}) {
  const showFullName = useShowFullName();
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
      className="sidebar-toggle d-flex d-lg-none position-fixed top-0 left-0 w-100 h-100 overflow-hidden"
    >
      <div className="menu bg-white bg-opacity-90 d-flex flex-column gap-3 h-100">
        {navItems.landing.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `text-${isActive ? "primary" : "dark"} w-100 text-start py-3 px-2`
            }
          >
            {item.label}
          </NavLink>
        ))}
        <li>
          <Link to={signInPath} className="Button btn text-primary d-lg-none">
            {showFullName()}
          </Link>
        </li>
      </div>
      <button
        className="hide-btn flex-1 opacity-0"
        onClick={() => onHide(false)}
      ></button>
    </div>
  );
}
