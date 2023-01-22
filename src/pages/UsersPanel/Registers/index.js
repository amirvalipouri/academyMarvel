import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { axios, moment } from "../../../boot";
import { Input, Modal, Form, Button, NotFound } from "../../../components";
import { rules } from "../../../constants";
import { useSetToken } from "../../../hooks";
import { objectSelect, toast } from "../../../methods";

export default function Registers() {
  const setToken = useSetToken();
  const profile = useSelector((s) => s.profile);
  const [registersList, setRegistersList] = useState([]);
  const [data, setData] = useState({ ...profile });
  const [activeId, setActiveId] = useState(null);
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
      label: "کدملی",
      state: "nationalId",
      type: "number",
      rules: rules.nationalId,
    },
  ];
  const getRegistersList = () => {
    const url = "/pub/registers";
    axios.get(url).then(({ data }) => {
      setRegistersList(data.data);
    });
  };
  const submit = () => {
    const keys = formControls.map((e) => e.state);
    const url = "/users/register";
    const body = objectSelect(data, keys);
    body.registerId = activeId;
    axios.post(url, body).then(({ data, headers }) => {
      const token = headers["x-auth-token"];
      const role = data.role;
      const text =
        "ثبت نام شما با موفقیت انجام شد. برای دسترسی به دوره‌ها از منوی پنل کاربری استفاده کنید.";
      setToken({ token, role });
      toast({ text, duration: 10000 });
      setActiveId(null);
    });
  };
  useEffect(getRegistersList, []);
  return (
    <Container>
      <Row>
        <h4 className="text-center col-12">ثبت نام دوره‌های مارول ترید</h4>
        {!registersList.length && <NotFound />}
        {registersList.map((item) => (
          <Col xs="12" md="6" lg="5" xl="4" key={item._id}>
            <div className="w-100 bg-white rounded d-flex flex-column flex-center text-center shadow-sm border border-light-gray p-2 gap-4">
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <p className="text-dark fs-7">
                <i className="bi bi-exclamation-triangle text-warning" />
                مهلت ثبت‌نام از تاریخ{" "}
                <b className="text-success">
                  {moment.miladiToShamsi({
                    date: item.registerStartDate,
                  })}
                </b>{" "}
                تا تاریخ{" "}
                <b className="text-success">
                  {moment.miladiToShamsi({
                    date: item.registerEndDate,
                  })}
                </b>{" "}
                است.
              </p>
              <Button
                onClick={() => setActiveId(item._id)}
                variant="success"
                className="mt-5"
              >
                ثبت‌نام
              </Button>
            </div>
          </Col>
        ))}
      </Row>
      <Modal
        show={!!activeId}
        onHide={setActiveId}
        title={`ثبت نام دوره ${
          registersList.find((e) => e._id === activeId)?.title
        }`}
      >
        <Form onSubmit={submit} className="row">
          {formControls.map((e) => (
            <Col key={e.state} xs="12">
              <Input
                {...e}
                value={data[e.state]}
                setValue={(val) => setData((p) => ({ ...p, [e.state]: val }))}
              />
            </Col>
          ))}
          <Col xs="12">
            <Button type="submit" className="d-block mx-auto">
              ثبت نام
            </Button>
          </Col>
        </Form>
      </Modal>
    </Container>
  );
}
