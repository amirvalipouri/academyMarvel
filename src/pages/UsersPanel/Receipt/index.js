import React from "react";
import { Col } from "react-bootstrap";
import { useQuery } from "../../../hooks";
import okIcon from "../../../assets/icons/receipt ok.svg";
import nokIcon from "../../../assets/icons/receipt nok.svg";

export default function Receipt() {
  const { status, refId } = useQuery();
  const isOk = status === "OK";
  return (
    <div className="py-5 row">
      <Col xs="12" md="10" lg="8">
        <div className="wrapper d-flex flex-column flex-center text-center gap-3 p-3">
          {isOk ? (
            <React.Fragment>
              <img
                width="75"
                className="d-block mx-auto"
                src={okIcon}
                alt="status-ok"
              />
              <h4 className="text-primary">از خرید شما سپاسگزاریم</h4>
              <p className="text-success">
                <i className={`bi bi-ticket-detailed ms-1`} />
                شماره سفارش : {refId}
              </p>
              <p>
                سفارش شما با موفقیت ثبت و توسط کارشناسان بررسی و درصورت تایید،
                محصولات بین <span className="fw-bold">1 هفته</span> الی{" "}
                <span className="fw-bold">10 روز</span> ارسال میشوند.
              </p>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <img
                width="100"
                className="d-block mx-auto"
                src={nokIcon}
                alt="status-ok"
              />
              <h4 className="text-danger">متاسفانه پرداخت شما ناموفق بود!</h4>
              <p className="text-warning">
                <i className="bi bi-exclamation-triangle-fill ms-1" />
                درصورت عدم پرداخت تا 1 ساعت دیگر تمام این سفارش به صورت خودکار
                لغو خواهد شد.
              </p>
            </React.Fragment>
          )}
        </div>
      </Col>
    </div>
  );
}
