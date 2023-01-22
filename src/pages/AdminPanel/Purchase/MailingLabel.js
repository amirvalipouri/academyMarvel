import React from "react";
import { Col, Row } from "react-bootstrap";
import { useGetSenderInfo } from "../../../hooks";
import { convertPhone } from "../../../methods";
import { moment } from "../../../boot";
import { paymentMethods } from "../../../constants";
import './index.scss'

export default function MailingLabel({ info = {} }) {
  const [senderInfo] = useGetSenderInfo();
  const sender = [
    {
      label: "فرستنده",
      value: `${senderInfo.senderFirstName} ${senderInfo.senderLastName}`,
    },
    {
      label: "نشانی",
      value: `${senderInfo.senderProvince} - ${senderInfo.senderCity} - ${senderInfo.senderAddress}`,
    },
    {
      label: "کد پستی",
      value: senderInfo.senderPostCode,
    },
    {
      label: "تلفن",
      value: senderInfo.senderMobile,
    },
  ];
  const recipient = [
    {
      label: "گیرنده",
      value: `${info?.shipping?.firstName} ${info?.shipping?.lastName}`,
    },
    {
      label: "نشانی",
      value: info?.shipping?.address,
    },
    {
      label: "کد پستی",
      value: info?.shipping?.postCode,
    },
    {
      label: "شماره تماس",
      value: convertPhone(info?.shipping?.phone),
    },
  ];
  const showPaymentMethod = (id = 0) => {
    return paymentMethods.find((e) => e.id === id)?.name;
  };
  const formControls = [
    {
      label: "هزینه ارسال",
      value:
        !!info?.shippingFee || !!info?.shippingFeeUsd
          ? `${info?.shippingFee.toLocaleString()} تومان - ${
              info?.shippingFeeUsd
            } تتر`
          : "رایگان",
    },
    {
      label: "تخفیف",
      value: !!info?.voucher
        ? `${info?.offPrice?.toLocaleString()} تومن -  ${info?.offPriceUsd} تتر`
        : "بدون تخفیف",
    },
    {
      label: "نوع پرداخت",
      value: showPaymentMethod(info?.paymentMethod),
    },
    {
      label: "مجموع مبلغ نهایی",
      value: `${(
        info?.totalPrice - (info?.offPrice ?? 0)
      ).toLocaleString()} تومان - ${
        info?.totalPriceUsd - (info?.offPriceUsd ?? 0)
      } تتر`,
    },
  ];
  const items = [[], sender, recipient, []];
  return (
    <div className=" d-none d-print-block w-100 MailingLabel">
      <p className="w-100 text-center"> برچسب پستی</p>
      <Row
        
        className="align-items-stretch row-gap-0 border-dark p-1 rounded"
      >
        {items.map((e, i) => (
          <Col
            key={i}
            xs={!!e.length ? "7" : "5"}
            className="border border-light-gray py-1 px-3 rounded"
          >
            {e.map((e, index) => (
              <p key={index}>
                {e.label}: <span className="text-dark">{e.value}</span>
              </p>
            ))}
          </Col>
        ))}
      </Row>
      <p className="w-100 text-center">فاکتور</p>
      <Row
        
        className="align-items-stretch row-gap-0 border-dark p-1 rounded"
      >
        <p className="w-100">
          تاریخ:{" "}
          <span className="text-dark">
            {moment.miladiToShamsi({ date: info?.createdAt })}
          </span>
        </p>
        <table className="table col-12">
          <thead>
            <tr>
              <td>عنوان</td>
              <td>تعداد</td>
              <td>مبلغ واحد</td>
              <td>مبلغ کل</td>
            </tr>
          </thead>
          <tbody className="border">
            {info?.items?.map((e) => (
              <tr key={e._id}>
                <td>{e.product?.title_fa}</td>
                <td>{e.count}</td>
                <td>{`${e.product?.price.toLocaleString()} تومان - ${
                  e.product?.priceUsd
                } تتر`}</td>
                <td>{`${(
                  e.product?.price * e.count
                ).toLocaleString()} تومان`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {formControls.map((e) => (
          <React.Fragment key={e.label}>
            <Col xs="6" className="border px-3 py-2">
              {e.label}:
            </Col>
            <Col xs="6" className="border px-3 py-2">
              {e.value}
            </Col>
          </React.Fragment>
        ))}
      </Row>
    </div>
  );
}
