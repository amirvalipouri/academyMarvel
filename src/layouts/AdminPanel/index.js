import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { navItems } from "../../constants";
import { getTime } from "../../methods";
import bgSliderImg from "../../assets/images/bg-slider-3.jpg";
import "./index.scss";
export default function AdminPanel() {
  const sidebar = useRef();
  const location = useLocation();
  const [time, setTime] = useState(["00", "00", "00"]);
  const [show, setShow] = useState(false);
  const handleChangeShow = () => {
    sidebar.current.classList.toggle("active", show);
  };
  const handleChangeLocation = () => {
    setShow(false);
  };
  const handleGetTime = () => {
    setTime(getTime());
    const interval = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(interval);
  };

  useEffect(handleChangeLocation, [location.pathname]);
  useEffect(handleChangeShow, [show]);
  useEffect(handleGetTime, []);
  return (
    <Row className="AdminPanel position-relative align-items-start">
      <Col
        ref={sidebar}
        xs="12"
        lg="3"
        xl="2"
        className="sidebar d-print-none d-flex p-0"
      >
        <div className="sidebar-content position-relative bg-dark">
          <img className="bg-img opacity-2" src={bgSliderImg} alt="bg slider" />
          <div className="h-100 overflow-auto px-2 py-2 text-white">
            <div
              style={{ pointerEvents: "none" }}
              className="text-center fw-bold"
            >
              <h3 className="text-primary">Marvel Trade</h3>
              <h6 className="text-primary">We are creating better world</h6>
            </div>
            {navItems.admin.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className="w-100 bg-white d-flex align-items-center rounded-2 text-truncate"
              >
                <i
                  className={`d-flex flex-center rounded fs-5 bi bi-${item.icon} ms-2`}
                />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
        <button
          className="hide-btn flex-1 d-block d-lg-none opacity-0"
          onClick={() => setShow(false)}
        />
      </Col>
      <Col xs="12" lg="9" xl="10" className="px-0 position-relative">
        <header className="position-sticky d-print-none top-0 left-0 d-flex align-items-center bg-white rounded-2 shadow w-100 p-2">
          <button
            className="bi bi-list bg-transparent border-0 fs-2 d-block d-lg-none"
            onClick={() => setShow(true)}
          />
          <div className="time d-flex flex-center fs-5 me-auto" dir="ltr">
            {time.map((item, index) => (
              <span key={index} className="font-en d-block px-1 fw-bold">
                {item}
              </span>
            ))}
          </div>
        </header>
        <div className="my-3 py-3 px-2 bg-white rounded-2 shadow w-100">
          <Outlet />
        </div>
      </Col>
      {/* <button className="setting-btn btn btn-primary rounded-circle p-0 position-fixed">
        <i className="bi bi-gear fs-4 d-flex flex-center animation-spin" />
      </button> */}
    </Row>
  );
}
