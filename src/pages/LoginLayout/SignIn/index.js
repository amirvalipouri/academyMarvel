import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import cloneDeep from "lodash/cloneDeep";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Button } from "../../../components";
import { rules, rolesPath } from "../../../constants";
import { axios } from "../../../boot";
import { useQuery, useSetToken } from "../../../hooks";
import { convertPhone, toast } from "../../../methods";
import Profile from "../../UsersPanel/Profile";
import {PrintModal} from "../../../components";
import TermsConditions from "../../../components/TermsCondition";
// import googleIcon from "../../../assets/icons/Google.svg";
// import linkedInIcon from "../../../assets/icons/LinkedIn.svg";

export default function SignIn() {
  const navigate = useNavigate();
  const setToken = useSetToken();
  const { hasCart } = useQuery();
  const [params] = useSearchParams();
  const phone = params.get("phone");
  const [data, setData] = useState({ phone });
  const [ show , setShow ] = useState(false)
  
  // console.log("full name : ",fullName)
  
  const tabs = {
    sms: "شماره موبایل",
    email: "ایمیل",
  };
  const [activeTab, setActiveTab] = useState("sms");
  const smsFormControls = [
    {
      label: "شماره موبایل",
      state: "phone",
      type: "number",
      rules: rules.phoneNumber,
      append: <Button onClick={() => sendCode()}>ارسال کد</Button>,
    },
    {
      label: "کد ارسال شده",
      state: "code",
      type: "number",
    },
  ];
  const emailFormControls = [
    {
      label: "ایمیل",
      state: "email",
      type: "email",
      rules: rules.email,
    },
    {
      label: "کلمه عبور",
      state: "password",
      type: "password",
      rules: rules.password,
    },
  ];
  const formControls = { sms: smsFormControls, email: emailFormControls };
  const sendCode = () => {
    const isValid = rules.phoneNumber.every(
      (rule) => rule(data.phone) === true
    );
    setData((p) => ({ ...p, code: "" }));
    if (!isValid)
      return toast({ text: "شماره موبایل نادرست است", type: "error" });
    const url = "/users/send-sms";
    const body = { phone: convertPhone(data.phone, true) };
    axios.post(url, body).then(() => {
      const text = "کد با موفقیت ارسال شد.";
      toast({ text });
    });
  };
  const verify = () => {
    const url = "/users/verify";
    const body = cloneDeep(data);
    body.phone = convertPhone(body.phone, true);
    axios.post(url, body).then(handleSetToken);
  };
  const login = () => {
    const url = "/users/sign-in";
    const body = { ...data };
    axios.post(url, body).then(handleSetToken);
  };
  const handleSetToken = ({ data, headers }) => {
    const token = data.token
    const role = data.role;
    const text = "برای دسترسی به دوره‌ها ثبت‌نام کنید.";
    role === "unregistered" && toast({ text });
    setToken({ token, role });
    
    // if(data.firstName?.length == 0 || data.lastName?.length == 0) return navigate("/profile")
    if (hasCart) return navigate("/cart");
    navigate(rolesPath[role] ?? "/", { replace: true });
  };
  const handleSubmit = () => {
    if (activeTab === "sms") return verify;
    return login;
  };
  useEffect(() => setData({}), [activeTab]);
  return (
    <Form onSubmit={handleSubmit()} className="row">
      <PrintModal size="lg" show={show} onHide={setShow}>
        <TermsConditions/>
      </PrintModal>
      <h1 className="h4 lh-normal m-0 col-12 text-primary">خوش آمدید</h1>
      <p className="col-12 mb-4">
        برای <span className="fw-bold">ورود</span> یا{" "}
        <span className="fw-bold">ثبت‌نام</span> {tabs[activeTab]} خود را وارد
        کنید
      </p>
      {formControls[activeTab].map((item) => (
        <Col key={item.state} xs="12">
          <Input
            {...item}
            value={data[item.state]}
            setValue={(val) => setData((p) => ({ ...p, [item.state]: val }))}
          />
        </Col>
      ))}
      {/* <Col xs="12" className="d-flex algn-items-center justify-content-between">
        <ToggleSwitch
          value={data.remember}
          setValue={(val) => setData((p) => ({ ...p, remember: val }))}
          label="مرا به خاطر بسپار"
        />
        <Link to="/forget-password" className="text-dark-blue">
          فراموشی رمز ورود
        </Link>
      </Col> */}
      <Col xs="12">
        <p>با ورود به این سایت <span className="text-primary cursor-pointer" onClick={()=>setShow(true)}>قوانین و مقررات</span> را پذیرفته ام.</p>
      </Col>
      <Col xs="12">
        <Button type="submit" className="w-100">
          ورود
        </Button>
      </Col>
      {/* <Col xs="12">
        <div className="line-label position-relative w-100 text-center text-gray">
          <span className="d-block position-relative w-fit mx-auto px-2">
            ورود راحت با
          </span>
        </div>
      </Col>
      <Row dir="ltr" className="col-12">
        <Col xs="6">
          <button
            type="button"
            className="w-100 bg-white border border-gray rounded d-flex flex-center col-gap-2 lh-normal py-2"
          >
            <img
              width="18"
              height="18"
              className="object-fit-contain"
              src={linkedInIcon}
              alt="linkedInIcon"
            />
            LinkedIn
          </button>
        </Col>
        <Col xs="6">
          <button
            type="button"
            className="w-100 bg-white border border-gray rounded d-flex flex-center col-gap-2 lh-normal py-2"
          >
            <img
              width="18"
              height="18"
              className="object-fit-contain"
              src={googleIcon}
              alt="googleIcon"
            />
            Google
          </button>
        </Col>
      </Row> */}
      {activeTab === "sms" && (
        <p>
          در صورتی که خارج از ایران هستید با{" "}
          <button
            className="text-primary text-decoration-underline fw-bold"
            type="button"
            onClick={() => setActiveTab("email")}
          >
            ایمیل
          </button>{" "}
          وارد شوید
        </p>
      )}
      {activeTab === "email" && (
        <p className="col-12 text-center">
          حساب کاربری ندارید؟{" "}
          <Link to="/sign-up" replace className="text-primary">
            ثبت نام کنید
          </Link>
        </p>
      )}
    </Form>
  );
}
