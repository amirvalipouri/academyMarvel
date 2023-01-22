import { Button, Form, Input } from "../../../components";
import { axios } from "../../../boot";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { rules } from "../../../constants";
import { toast } from "../../../methods";

export default function Wallet() {
  const [wallet, setWallet] = useState("");
  const getData = () => {
    const url = "/admins/pub/shop/wallets";
    axios.get(url).then(({ data }) => {
      setWallet(data.address);
    });
  };
  const submitWallet = () => {
    const url = "/admins/pub/shop/wallets";
    const body = { address: wallet };
    axios.post(url, body).then(() => {
      toast({});
    });
  };
  useEffect(getData, []);
  return (
    <Form onSubmit={submitWallet} className="row">
      <Col xs="12" md="6" lg="4">
        <Input
          label="آدرس ولت"
          value={wallet}
          setValue={setWallet}
          rules={rules.required}
        />
      </Col>
      <Col xs="12" className="d-flex flex-center">
        <Button type="submit">ثبت</Button>
      </Col>
    </Form>
  );
}
