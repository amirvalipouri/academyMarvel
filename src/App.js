import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./routes";
import { Loading } from "./components";
import { axios } from "./boot";
import { convertPhone, scrollToTop } from "./methods";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLogged = useSelector((s) => s.isLogged);
  const role = useSelector((s) => s.role);
  const elements = useRoutes(routes(isLogged, role));
  const setProfile = (data = {}) => {
    dispatch({ type: "SET_PROFILE", data });
  };
  const getProfile = () => {
    if (!isLogged) return;
    const url = "/users/me";
    axios.get(url).then(({ data }) => {
      setProfile({ ...data, phone: convertPhone(data.phone) });
    });
  };
  useEffect(getProfile, [isLogged]);
  useEffect(scrollToTop, [location.pathname]);
  return (
    <React.Fragment>
      <h1 className="d-none">آکادمی مارول ترید</h1>
      <Toaster position="top-center" reverseOrder={false} />
      {elements}
      <Loading />
    </React.Fragment>
  );
}
