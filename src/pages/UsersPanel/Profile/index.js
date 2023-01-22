import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "react-bootstrap";

import { Form, Input, Button } from "../../../components";
import { axios } from "../../../boot";
import { rules } from "../../../constants";
import { objectSelect, toast } from "../../../methods";
export default function Profile() {
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
    // {
    //   label: "کد ملی",
    //   state: "nationalId",
    //   rules: rules.nationalId,
    // },
    {
      label: "شماره موبایل (غیر قابل تغییر)",
      state: "phone",
      rules: rules.optional,
      readOnly: true,
    },
    {
      label: "رمز عبور جدید (اختیاری)",
      state: "password",
      rules: rules.newPassword,
    },
  ];
  const dispatch = useDispatch();
  const profile = useSelector((s) => s.profile);
  const [data, setData] = useState({});
  const setProfile = (data = {}) => {
    dispatch({ type: "SET_PROFILE", data });
  };
  const submit = () => {
    const keys = formControls.map((e) => e.state);
    const url = "/users/me";
    const body = objectSelect(data, keys);
    body._id = data._id;
    delete body.phone;
    axios.put(url, body).then(() => {
      toast({});
      setProfile({ ...profile, ...body });
    });
  };
  useEffect(() => setData(profile), [profile]);
  return (
    <Form onSubmit={submit} className="row wrapper">
      {formControls.map((item, index) => (
        <Col key={index} xs="12" md="6" lg="4">
          <Input
            {...item}
            value={data[item.state]}
            setValue={(val) => setData((p) => ({ ...p, [item.state]: val }))}
          />
        </Col>
      ))}
      <div className="col-12 d-flex flex-center">
        <Button type="submit">ثبت اطلاعات</Button>
      </div>
    </Form>
  );
}
