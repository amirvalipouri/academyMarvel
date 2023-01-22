import { Col } from "react-bootstrap";
import { downloadBase64 } from "../../../methods";

export default function PayInfo({ pay = {} }) {
  const formControls = [
    {
      label: "کیف پول مبدا",
      value: pay.receiverWallet,
    },
    {
      label: "کیف پول مقصد",
      value: pay.senderWallet,
    },
    {
      label: "مقدار تتر",
      value: pay.price,
    },
    {
      label: "مقدار TXID",
      value: pay.txId,
    },
    {
      label: "رسید پرداخت",
      value: (
        <button
          className="text-primary btn-link"
          onClick={() => downloadBase64(pay.image)}
        >
          دانلود
        </button>
      ),
    },
    {
      label: "توضیحات",
      value: pay.comment,
    },
  ];
  return formControls.map((e) => (
    <Col key={e.label} xs="12" md="6" className={`text-${e.color}`}>
      <span className="text-secondary">{e.label}:</span> {e.value}
    </Col>
  ));
}
