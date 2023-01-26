import { Col, Row } from "react-bootstrap";
import { paymentMethods, purchaseStatus } from "../../../constants";
import { convertPhone } from "../../../methods";

export default function ShowInfo({ data = {} }) {
  const showPaymentMethod = (id = 0) => {
    return paymentMethods.find((e) => e.id === id)?.name;
  };
  const showPurchaseStatus = (id = "") => {
    const { name, color } = purchaseStatus.find((e) => e.id === id) || {};
    return <span className={`text-${color} fw-bold`}>{name}</span>;
  };
  const formControls = [
    {
      label: "نام و نام خانوادگی گیرنده",
      value: `${data?.shipping?.firstName} ${data?.shipping?.lastName}`,
    },
    {
      label: "آدرس گیرنده",
      value: data?.shipping?.address,
    },
    {
      label: "شماره تماس گیرنده",
      value: convertPhone(data?.shipping?.phone),
    },
    {
      label: "نام محصول(ها)",
      value: data?.items?.map((e) => e.product?.title_fa).join(" - "),
    },
    {
      label: "تعداد",
      value: data?.totalCount,
    },
    {
      label: "تخفیف",
      color: "danger",
      value: !!data?.voucher
        ? `${data?.offPrice} تومن -  ${data?.offPriceUsd} تتر`
        : "بدون تخفیف",
    },
    {
      label: "هزینه ارسال",
      value:
        !!data?.shippingFee && !!data?.shippingFeeUsd
          ? `${data?.shippingFee.toLocaleString()} تومان - ${data?.shippingFeeUsd
          } تتر`
          : "رایگان",
      color: "success",
    },
    {
      label: "قیمت نهایی",
      color: "primary",
      value: `${data?.totalPrice?.toLocaleString()} تومان - ${data?.totalPriceUsd
        } تتر`,
    },
    {
      label: "نوع پرداخت",
      value: showPaymentMethod(data?.paymentMethod),
    },
    {
      label: "وضعیت",
      value: showPurchaseStatus(data?.status),
    },

  ];
  return (
    <Row>
      {formControls.map((e) => (
        <Col key={e.label} xs="12" md="6" className={`text-${e.color}`}>
          <span className="text-secondary">{e.label}:</span> {e.value}
        </Col>
      ))}

      {data?.spotLisence?.length > 0 &&
        <Col  xs="12" md="12" className={`d-print-none`}>
          <span className="text-primary">لایسنس:</span> <br/> <span style={{wordBreak : "break-all"}}>{data?.spotLisence[0]}</span>
        </Col>
      }

    </Row>
  )


}
