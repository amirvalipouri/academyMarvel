import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logos/logo text.png";
import { navItems } from "../../constants";
import { logout } from "../../methods";
import SupportSection from "./SupportSection";

export default function MenuContent() {
  return (
    <React.Fragment>
      <img width="100" src={logo} alt="logo" />
      <hr className="w-100" />
      <ul className="w-100">
        {navItems.user.map((item, index) => (
          <li key={index} className="w-100 my-1">
            <NavLink
              to={item.path}
              className="d-flex align-items-center rounded p-2 col-gap-3 w-100 text-truncate"
            >
              <i
                className={`d-flex flex-center rounded fs-5 bi bi-${item.icon}`}
              />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li>
          <button
            onClick={() => logout()}
            className="d-flex align-items-center rounded p-2 col-gap-3 w-100"
          >
            <i className="d-flex flex-center rounded fs-5 bi bi-box-arrow-right" />
            <span>خروج از حساب</span>
          </button>
        </li>
      </ul>
      <SupportSection />
    </React.Fragment>
  );
}
