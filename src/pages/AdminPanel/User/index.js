import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import cloneDeep from "lodash/cloneDeep";
import { Col, ButtonGroup } from "react-bootstrap";
import { rules, roles } from "../../../constants";
import { convertPhone, toast } from "../../../methods";
import { Form, Input, Select, Button } from "../../../components";
import { axios } from "../../../boot";

export default function User() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const isNewUser = params.userId === "new";
  const fromControls = [
    {
      label: "نام",
      state: "firstName",
    },
    {
      label: "نام خانوادگی",
      state: "lastName",
    },
    {
      label: "شماره موبایل",
      type: "number",
      state: "phone",
      dir: "ltr",
      rules: rules.phoneNumber,
    },
    {
      tag: Select,
      label: "سطح دسترسی",
      state: "role",
      items: roles,
    },
  ];
  const getData = () => {
    if (!isNewUser) {
      const url = `/admins/users/${params.userId}`;
      axios.get(url).then(({ data }) => {
        const body = cloneDeep(data);
        body.phone = convertPhone(data.phone);
        setData(body);
      });
    }
  };
  const addNewUser = () => {
    const url = "/admins/users";
    const body = cloneDeep(data);
    body.phone = convertPhone(data.phone, true);
    axios.post(url, body).then(() => {
      toast({});
      navigate("/admin/users", { replace: true });
    });
  };
  const changeUser = () => {
    const url = "/admins/users";
    const body = cloneDeep(data);
    body.phone = convertPhone(data.phone, true);
    delete body.createdAt;
    delete body.email;
    delete body.needRegister;
    axios.put(url, body).then(() => {
      toast({});
    });
  };
  const deleteUser = () => {
    const message = "آیا از درخواست خود اطمیمان دارید؟";
    if (window.confirm(message)) {
      const url = "/admins/users";
      const body = { _id: params.userId };
      axios.delete(url, { data: body }).then(() => {
        toast({});
        navigate("/admin/users", { replace: true });
      });
    }
  };

  useEffect(getData, []);
  return (
    <Form onSubmit={isNewUser ? addNewUser : changeUser} className="row">
      <h5 className="text-center col-12">
        {isNewUser ? "اضافه کردن کاربر جدید" : "اطلاعات کاربر"}
      </h5>
      {fromControls.map((props, index) => (
        <Col key={index} xs="12" md={index === 5 ? "12" : "6"}>
          {React.createElement(props.tag ?? Input, {
            ...props,
            value: data[props.state],
            setValue: (val) => setData((p) => ({ ...p, [props.state]: val })),
          })}
        </Col>
      ))}
      <div className="col-12 d-flex flex-center">
        <ButtonGroup>
          {!isNewUser && (
            <Button variant="danger" onClick={deleteUser}>
              حذف
            </Button>
          )}
          <Button type="submit">ثبت</Button>
        </ButtonGroup>
      </div>
    </Form>
  );
}
