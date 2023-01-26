import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Input, Button } from "../../../components";
import { captchaKey, rules } from "../../../constants";
import { axios } from "../../../boot";
import { useSetToken } from "../../../hooks";

export default function SignUp() {
  const setToken = useSetToken();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const formControls = [
    {
      label: "نام",
      state: "firstName",
    },
    {
      label: "نام خانوادگی",
      state: "lastName",
    },
    {
      label: "ایمیل",
      state: "email",
      rules: rules.email,
    },
    {
      label: "کلمه عبور",
      state: "password",
      type: "password",
      rules: rules.password,
    },
    {
      label: "تکرار کلمه عبور",
      state: "rePassword",
      type: "password",
      rules: [(val = "") => data.password === val || "کلمه عبور مطابقت ندارد"],
    },
  ];
  const signUp = () => {
    const url = "/users/sign-up";
    const body = { ...data };
    delete body.rePassword;
    axios.post(url, body).then(({ data, headers }) => {
      const token = headers["x-auth-token"];
      const role = data.role;
      setToken({ token, role });
      navigate("/");
    });
  };
  return (
    <Form onSubmit={signUp} className="row">
      {/* <p className="col-12 text-dark-blue text-center">عضویت از طریق</p>
      <div dir="ltr" className="col-12 d-flex flex-center col-gap-2">
        {[facebookIcon, googleIcon, linkedInIcon].map((item, index) => (
          <button
            key={index}
            type="button"
            className="sign-up-btn bg-white border border-gray rounded d-flex flex-center"
          >
            <img
              width="25"
              height="25"
              className="object-fit-contain"
              src={item}
              alt={item}
            />
          </button>
        ))}
      </div>
      <p className="col-12 text-dark-blue text-center">یا</p> */}

      {formControls.map((item, index) => (
        <Col key={index} xs="12">
          <Input
            {...item}
            value={data[item.state]}
            setValue={(val) => setData((p) => ({ ...p, [item.state]: val }))}
          />
        </Col>
      ))}
      <ReCAPTCHA
        className="mx-auto d-block w-fit"
        sitekey={captchaKey}
        onChange={(recaptcha) => setData((p) => ({ ...p, recaptcha }))}
      />
      <Col xs="12">
        <Button type="submit" className="w-100" disabled={!data.recaptcha}>
          عضویت
        </Button>
      </Col>
      <p className="col-12 text-center">
        حساب کاربری دارید؟{" "}
        <Link to="/sign-in" replace className="text-primary">
          وارد شوید
        </Link>
      </p>
    </Form>
  );
}
