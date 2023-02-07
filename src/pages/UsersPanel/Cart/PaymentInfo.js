import React ,{useState} from "react";
import { Col } from "react-bootstrap";
import { Button , PrintModal } from "../../../components";
import TermsConditions from "../../../components/TermsCondition";

export default function PaymentInfo({
  activeStep = 0,
  data = {},
  submit = () => { },
  disabled = false,
  activeAddress = false,
  paymentType = "",
}) {
  const [ show , setShow ] = useState(false)
  const {
    totalPrice = 0,
    totalPriceUsd = 0,
    shippingFee = 0,
    shippingFeeUsd = 0,
    offPrice = 0,
    offPriceUsd = 0,
  } = data;
  const price = {
    IRR: totalPrice - shippingFee,
    USD: totalPriceUsd - shippingFeeUsd,
  }[paymentType];
  const finalPrice = {
    IRR: totalPrice - offPrice,
    USD: totalPriceUsd - offPriceUsd,
  }[paymentType];
  const off = {
    IRR: offPrice,
    USD: offPriceUsd,
  }[paymentType];
  const fee = {
    IRR: shippingFee,
    USD: shippingFeeUsd,
  }[paymentType];
  const measure = {
    IRR: "تومان",
    USD: "تتر",
  }[paymentType];
  const hasOff = !!off;
  const hasFee = !!fee;
  const info = [
    {
      label: "قیمت کالاها",
      value: `${price.toLocaleString()} ${measure}`,
    },
    hasOff && {
      label: "تخفیف کالاها",
      value: `${off.toLocaleString()} ${measure}`,
      valueColor: "danger",
    },
    activeAddress && {
      label: "هزینه ارسال",
      value: hasFee ? `${fee.toLocaleString()} ${measure}` : "رایگان",
      valueColor: "success",
    },
    activeAddress && {
      label: "مبلغ قابل پرداخت",
      value: `${finalPrice.toLocaleString()} ${measure}`,
      labelColor: "dark",
      valueColor: "primary",
    },
  ]
    .filter(Boolean)
    .map((e, id) => ({
      id,
      labelColor: "secondary",
      valueColor: "secondary",
      ...e,
    }));
  return (
    <div className="wrapper w-100 row">
      <PrintModal show={show} onHide={setShow}>
        <TermsConditions/>
      </PrintModal>
      {info.map((e) => (
        <React.Fragment key={e.id}>
          <Col xs="6" className={`text-truncate text-${e.labelColor}`}>
            {e.label}:
          </Col>
          <Col xs="6" className={`text-truncate text-${e.valueColor}`}>
            {e.value}
          </Col>
        </React.Fragment>
      ))}



      <Col xs="12">
        <p>با ورود به این سایت <span className="text-primary cursor-pointer" onClick={() => setShow(true)}>قوانین و مقررات</span> را پذیرفته ام.</p>

        {activeStep !== 2 && (
          <Button disabled={disabled} className="w-100" onClick={submit}>
            ادامه فرایند خرید
          </Button>
        )}
      </Col>
    </div>
  );
}
