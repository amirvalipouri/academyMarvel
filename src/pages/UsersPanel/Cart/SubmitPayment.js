import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { QRCodeSVG } from "qrcode.react";
import { Button, Form, Input, Modal } from "../../../components";
import { axios } from "../../../boot";
import { accept, rules } from "../../../constants";
import { copyText, toast } from "../../../methods";

export default function SubmitPayment({
  // paymentType = "",
  data = {},
  setData = () => {},
  submit = () => {},
}) {
  const [showQrCode, setShowQrCode] = useState(false);
  const [wallet, setWallet] = useState({});
  const getWallet = () => {
    const url = "/pub/shop/wallets";
    axios.get(url).then(({ data }) => {
      setData((p) => ({ ...p, receiverWallet: data.address }));
      setWallet(data);
    });
  };
  const copyWallet = () => {
    copyText(wallet.address)
      .then(() => {
        const text = "کپی شد";
        toast({ text });
      })
      .catch(() => {
        const text = "خطا در کپی لطفا مجددا تلاش کنید";
        toast({ text, type: "error" });
      });
  };
  const toggleShowQrCode = () => {
    setShowQrCode((p) => !p);
  };
  const formControls = [
    {
      label: "کیف پول مقصد",
      state: "receiverWallet",
      append: (
        <React.Fragment>
          <button
            type="button"
            className="bi bi-files input-group-text"
            onClick={copyWallet}
          />
          <button
            type="button"
            className="bi bi-qr-code-scan input-group-text"
            onClick={toggleShowQrCode}
          />
        </React.Fragment>
      ),
      readOnly: true,
      rules: rules.optional,
    },
    {
      label: "کیف پول مبدا",
      state: "senderWallet",
    },
    {
      label: "مبلغ پرداخت شده (تتر)",
      state: "price",
      type: "number",
    },
    {
      label: "عکس رسید",
      state: "image",
      type: "file",
      accept: accept.img,
    },
    {
      label: "TXID",
      state: "txId",
    },
    {
      as: "textarea",
      label: "توضیحات",
      state: "comment",
    },
  ];
  useEffect(getWallet, []);
  return (
    <div className="wrapper">
      <Modal show={showQrCode} onHide={setShowQrCode} title="کیف پول مقصد">
        <QRCodeSVG value={wallet.address} />
        <Button
          className="d-block mt-3 mx-auto px-2"
          onClick={toggleShowQrCode}
        >
          بستن
        </Button>
      </Modal>
      <Form className="row" onSubmit={submit}>
        {formControls.map((e) => (
          <Col key={e.state} xs="12">
            {React.createElement(e.tag ?? Input, {
              ...e,
              value: data[e.state],
              setValue: (val) => setData((p) => ({ ...p, [e.state]: val })),
            })}
          </Col>
        ))}
        <Col xs="12">
          <Button type="submit" className="w-100">
            ثبت رسید
          </Button>
        </Col>
      </Form>
    </div>
  );
}
