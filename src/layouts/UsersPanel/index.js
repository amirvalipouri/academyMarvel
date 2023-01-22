import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { axios } from "../../boot";
import Notifications from "./Notifications";
import Menu from "./Menu";
import MenuContent from "./MenuContent";
import Breadcrumbs from "./Breadcrumbs";
import { FooterContent } from "../../components";
import { useShowFullName } from "../../hooks";
import CartCountProvider from "../../contexts/CartCount";
import "./index.scss";
import CartLink from "./CartLink";

export default function UsersPanel() {
  const showFullName = useShowFullName();
  const [show, setShow] = useState(false);
  // const logTime = () => {
  //   const url = "/activity-logs/time";
  //   const time = 5 * 60 * 1000;
  //   const callback = () => axios.post(url);
  //   callback();
  //   const interval = setInterval(callback, time);
  //   return () => {
  //     callback();
  //     clearInterval(interval);
  //   };
  // };
  // useEffect(logTime, []);
  return (
    <CartCountProvider>
      <Row className="UsersPanel align-items-start py-2">
        <Menu show={show} onHide={setShow} />
        <Col xs="12" lg="3" xl="2" className="d-none d-lg-block">
          <div className="sidebar d-flex flex-column flex-center row-gap-3">
            <MenuContent />
          </div>
        </Col>
        <Col xs="12" lg="9" xl="10" className="main-section">
          <header className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center justify-content-lg-between">
            <Breadcrumbs />
            <div className="user-controls d-flex align-items-center gap-3">
              <button
                onClick={() => setShow(true)}
                className="bi bi-list fs-1 d-flex fle-center d-lg-none text-primary"
              />
              <Notifications />
              <Link
                to="/profile"
                className="bi bi-person-fill fs-4 text-primary d-block d-lg-none"
              />
              <CartLink />
              <Link
                to="profile"
                className="Button btn btn-primary d-none d-lg-flex flex-center col-gap-1 white-space-nowrap"
              >
                {showFullName()}
                <i className="bi bi-person-fill" />
              </Link>
            </div>
          </header>
          <main className="py-2">
            <Outlet />
          </main>
          <footer className="w-100">
            <FooterContent as="div" />
          </footer>
        </Col>
      </Row>
    </CartCountProvider>
  );
}
