import React, { useEffect, useState } from "react";
import { ButtonGroup, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { axios } from "../../../boot";
import { Select, Input, Form, Button } from "../../../components";
import { notificationsPriority, rules } from "../../../constants";
import { toast } from "../../../methods";

export default function Notification() {
  const navigate = useNavigate();
  const params = useParams();
  const isNew = params.id === "new";
  const [data, setData] = useState({});
  const formControls = [
    {
      label: "موضوع",
      state: "title",
    },
    {
      tag: Select,
      label: "سطح اهمیت",
      state: "priority",
      items: notificationsPriority,
    },
    {
      label: "بازه زمانی",
      state: "date",
      type: "date",
      range: true,
    },
    {
      as: "textarea",
      label: "توضیحات",
      state: "description",
      rules: rules.description,
    },
  ];
  const getNotification = () => {
    if (isNew) return;
    const url = `/admins/notifications/${params.id}`;
    axios.get(url).then((res) => {
      const data = { ...res.data };
      data.date = [data.startDate, data.expireDate];
      setData(data);
    });
  };
  const addNotification = () => {
    const url = "/admins/notifications";
    const body = { ...data };
    body.startDate = body.date[0];
    body.expireDate = body.date[1];
    delete body.date;
    axios.post(url, body).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  const deleteNotification = () => {
    const url = "/admins/notifications";
    const options = { data: { _id: params.id } };
    axios.delete(url, options).then(() => {
      toast({});
      navigate(-1, { replace: true });
    });
  };
  useEffect(getNotification, []);
  return (
    <Form className="row" onSubmit={isNew ? addNotification : undefined}>
      {formControls.map((e) => (
        <Col
          key={e.state}
          xs="12"
          md={e.state === "description" ? "12" : "6"}
          lg={e.state === "description" ? "12" : "4"}
        >
          {React.createElement(e.tag ?? Input, {
            ...e,
            value: data[e.state],
            setValue: (val) => setData((p) => ({ ...p, [e.state]: val })),
          })}
        </Col>
      ))}
      <Col xs="12">
        <div className="col-12 d-flex flex-center">
          <ButtonGroup>
            {!isNew && (
              <Button variant="danger" onClick={deleteNotification}>
                حذف
              </Button>
            )}
            {isNew && <Button type="submit">ثبت</Button>}
          </ButtonGroup>
        </div>
      </Col>
    </Form>
  );
}
