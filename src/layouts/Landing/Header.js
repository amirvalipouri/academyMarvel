import React, { useState , useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { navItems, rolesPath } from "../../constants";
import logoText from "../../assets/logos/logo text.png";
import logo from "../../assets/logos/logo.svg";
import Menu from "./Menu";
import { useShowFullName } from "../../hooks";
import CartLink from "./CartLink";


export default function Header() {
  const showFullName = useShowFullName();
  const [show, setShow] = useState(false);
  const role = useSelector((s) => s.role);
  const signInPath = rolesPath[role] ?? "/sign-in";
  return (
    <React.Fragment>
      <header className="container position-relative w-100 d-flex align-items-center justify-content-between bg-lg-white p-3 col-gap-3">
        <button
          onClick={() => setShow(true)}
          className="bi bi-list fs-1 d-flex fle-center d-lg-none text-primary"
        />
        <img width="35" src={logo} alt="logo" className="d-block d-lg-none" />
        <Link
          to="/cart"
          className="bi bi-cart3 fs-2 text-primary d-block d-lg-none"
        />
        <img
          width="65"
          src={logoText}
          alt="logo"
          className="d-none d-lg-block"
        />
        <nav className="flex-1 d-none d-lg-block">
          <ul className="d-flex align-items-center col-gap-3">
            {navItems.landing.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-${isActive ? "primary" : "dark-blue"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="user-control d-none d-lg-flex flex-center col-gap-3">
          <div className="position-relative">
            
            {/* <Link to="/cart" className="bi bi-cart3 fs-3 text-primary" /> */}
            <CartLink/>
          </div>
          
          <NavLink to={signInPath} className="btn btn-outline-primary Button">
            {showFullName()}
          </NavLink>
        </div>
      </header>
      <Menu signInPath={signInPath} show={show} onHide={setShow} />
    </React.Fragment>
  );
}
