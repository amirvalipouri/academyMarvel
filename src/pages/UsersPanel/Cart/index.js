import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import hToast from "react-hot-toast";
import { axios } from "../../../boot";
import { PaymentError } from "../../../components";
import { fileToBase64, toast } from "../../../methods";
import { useProductStorage } from "../../../hooks";
import Steps from "./Steps";
import PaymentInfo from "./PaymentInfo";
import Address from "./Address";
import Products from "./Products";
import PaymentType from "./PaymentType";
import SubmitPayment from "./SubmitPayment";
import "./index.scss";

export default function Cart() {
  const navigate = useNavigate();
  const productStorage = useProductStorage();
  const isLogged = useSelector((s) => s.isLogged);
  const [paymentData, setPaymentData] = useState({});
  const [paymentType, setPaymentType] = useState("IRR");
  const [activeStep, setActiveStep] = useState(0);
  const [cartInfo, setCartInfo] = useState({});
  const [addressData, setAddressData] = useState({ comment: " " });
  const [activeAddress, setActiveAddress] = useState(false);
  const getCartList = () => {
    if (!isLogged) {
      const data = productStorage.getCartInfo();
      setCartInfo(data);
      return;
    }
    if (productStorage.has()) {
      productStorage.addListToCart().then((list) => {
        setCartInfo(list?.at(-1)?.data ?? {});
        productStorage.clear();
      });
      return;
    }
    const url = "/purchases/cart";
    axios.get(url).then(({ data }) => {
      setCartInfo(data);
      
    });
  };
  const submitPaymentOffline = async () => {
    const url = "/purchases/pay-usd";
    const body = { ...paymentData };
    body.image = await fileToBase64(body.image[0]);
    body.price = +body.price;
    axios.post(url, body).then(() => {
      const text =
        "رسید شما با موفقیت ثبت شد. سفارش شما توسط کارشناسان بررسی و درصورت تایید محصولات ارسال میشوند.";
      toast({ text, duration: 10000 });
      navigate("/my-order", { replace: true });
    });
  };
  const submitPaymentOnline = () => {
    const url = "/purchases/pay-online";
    const body = {};
    axios
      .post(url, body)
      .then(({ data }) => {
        const link = data.url;
        window.location.href = link;
        const text = "در حال انتقال یه صفحه پرداخت";
        toast({ text, duration: 10000 });
      })
      .catch((e) => {
        hToast(
          ({ id }) => <PaymentError id={id} tryAgain={submitPaymentOnline} />,
          { duration: 30000 }
        );
      });
  };
  const submitNextPage = () => {
    if (!isLogged) {
      const text = "جهت ادامه فرایند خرید لطفا وارد حساب کاربری خود شوید.";
      toast({ text, type: "error" });
      navigate({ pathname: "/sign-in", search: "hasCart=true" });
      return;
    }
    const isPaymentOnline = paymentType === "IRR" && activeStep === 1;
    const isPaymentOffline = paymentType === "USD" && activeStep === 2;
    if (isPaymentOnline) return submitPaymentOnline();
    if (isPaymentOffline) return submitPaymentOffline();
    setActiveStep((p) => p + 1);
  };
  const handleDisabled = () => {
    if (activeStep === 1 && !activeAddress) return true;
    return false;
  };
  useEffect(() => window.scrollTo({ top: 0, left: 0 }), [activeStep]);
  useEffect(getCartList, []);
  if (!Boolean(cartInfo.totalCount))
    return <h4 className="text-center p-4">سبد خرید خالی است.</h4>;
  return (
    <Row className="Cart align-items-start">
      <Col xs="12">
        <Steps activeStep={activeStep} setActiveStep={setActiveStep} />
      </Col>
      <Col xs="12" lg="7">
        {activeStep === 0 && (
          <PaymentType
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            setCartInfo={setCartInfo}
            productInfo={cartInfo}
          />
        )}
        {activeStep === 1 && (
          <Address
            data={addressData}
            setData={setAddressData}
            setCartInfo={setCartInfo}
            activeAddress={activeAddress}
            setActiveAddress={setActiveAddress}
          />
        )}
        {activeStep === 2 && (
          <SubmitPayment
            data={paymentData}
            setData={setPaymentData}
            submit={submitNextPage}
          />
        )}
        <br />
        <Products cartItems={cartInfo.items} setCartInfo={setCartInfo} />
      </Col>
      <Col xs="12" lg="5">
        <PaymentInfo
          paymentType={paymentType}
          activeAddress={activeAddress}
          disabled={handleDisabled()}
          activeStep={activeStep}
          data={cartInfo}
          submit={submitNextPage}
        />
      </Col>
    </Row>
  );
}
