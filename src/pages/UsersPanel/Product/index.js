import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Badge, Button, Modal } from "../../../components";
import { axios } from "../../../boot";
import Specifications from "./Specifications";
import Review from "./Review";
import { offCal, showActiveImg, source } from "../../../methods";
import { useAddToCart, useProductStorage } from "../../../hooks";
import "./index.scss";
export default function Product() {
  const productStorage = useProductStorage();
  const addToCart = useAddToCart();
  const isLogged = useSelector((s) => s.isLogged);
  const params = useParams();
  const productId = params.id;
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState({});
  const hasOff = product.off !== 0;
  const hasOffUds = product.offUsd !== 0;
  const totalPrice = offCal(product.price, product.off).toLocaleString();
  const totalPriceUsd = offCal(product.priceUsd, product.offUsd);
  const activeImg = showActiveImg(product.img);
  const getProductInfo = () => {
    const url = `/pub/shop/products/${productId}`;
    axios.get(url).then(({ data }) => {
      setProduct(data);
      console.log("data pro : " , data)
    });
  };
  const addProductToCart = () => {
    if (isLogged) return addToCart(productId, 1);
    productStorage.set(product);
  };
  const showProductinfo = (data = product) => [
    {
      title: "قیمت",
      value: `${totalPrice} تومان`,
    },
    {
      title: "قیمت تتری",
      value: totalPriceUsd,
    },
    {
      title: "وزن محصول",
      value: data.weight,
    },
    {
      title: "تعداد موجود",
      value: data.count,
    },
  ];
  const tabs = [
    {
      title: "مشخصات کتاب",
      id: 0,
      component: Specifications,
    },
    {
      title: "نقد و بررسی",
      id: 1,
      component: Review,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const ActiveTabComponent = tabs.find((e) => e.id === activeTab).component;
  const isActvieTab = (id = 0) => {
    const isActive = activeTab === id;
    if (isActive) return "bg-primary bg-opacity-20 fw-bold";
    return "";
  };
  useEffect(getProductInfo, []);
  return (
    <div className="Product">
      <Modal title={product.title_fa} show={showModal} onHide={setShowModal}>
        <img
          className="w-100 d-block mb-4"
          src={source(activeImg)}
          alt={product.title}
        />
        <Button
          onClick={() => setShowModal(false)}
          className="d-block mx-auto px-3"
        >
          بستن
        </Button>
      </Modal>
      <Row className="wrapper">
        <Col xs="12" md="5" lg="3" xl="2">
          <div className="img-box d-flex flex-center w-100 position-relative">
            <div className="d-none d-lg-block circle position-absolute rounded-circle bg-primary bg-opacity-20 w-100" />
            {activeImg && (
              <img
                onClick={() => setShowModal(true)}
                width="65%"
                className="position-relative cursor-pointer"
                src={source(activeImg)}
                alt={product.title}
              />
            )}
          </div>
        </Col>
        <Col xs="12" md="7" lg="9" xl="10">
          <div className="w-100 d-flex flex-column flex-lg-row align-items-center gap-3">
            <h5 className="text-dark ms-lg-auto">{product.title_fa}</h5>
            <div className="d-flex flex-column flex-center">
              {hasOffUds && (
                <h6 className="text-secondary">
                  <span className="text-decoration-line-through">
                    {product.priceUsd} تتر
                  </span>{" "}
                  <Badge variant="danger" label={`${product.offUsd}%`} />
                </h6>
              )}
              <h5 className="text-dark">{totalPriceUsd} تتر</h5>
            </div>
            <div className="d-flex flex-column flex-center">
              {hasOff && (
                <h6 className="text-secondary">
                  <span className="text-decoration-line-through">
                    {product.price?.toLocaleString()} تومان
                  </span>{" "}
                  <Badge variant="danger" label={`${product.off}%`} />
                </h6>
              )}
              <h5 className="text-dark">{totalPrice} تومان</h5>
            </div>
          </div>
          <hr className="my-3 bg-light-gray" />
          {/* <div>
            <div className="w-fit d-flex flex-center mx-auto me-lg-0 text-gold fs-5">
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-fill" />
              <i className="bi bi-star-fill" />
            </div>
          </div> */}
          <Row className="justify-content-lg-between mt-4">
            {showProductinfo().map((e) => (
              <Col key={e.title} xs="12" md="6" lg="5" className="px-0">
                <p>
                  <i className="bi bi-dot" />
                  <span className="text-dark">
                    {e.title}: {e.value}
                  </span>
                </p>
              </Col>
            ))}
          </Row>
          <Button className="mt-3" onClick={addProductToCart}>
            افزودن به سبد خرید
          </Button>
          <hr className="my-3 bg-light-gray" />
          {/* <div className="d-flex align-items-center gap-5">
            <Link to="/" className="text-primary fs-7">
              <i className="bi bi-question-circle-fill ms-1" />
              راهنمای خرید امن
            </Link>
            <Link to="/" className="text-primary fs-7">
              <i className="bi bi-info-circle-fill ms-1" />
              گزارش مشکل آگهی
            </Link>
          </div> */}
        </Col>
      </Row>
      <div className="mt-4 wrapper p-0">
        <div className="tabs-btn d-flex flex-center border-bottom border-light-gray">
          {tabs.map((e) => (
            <button
              key={e.id}
              onClick={() => setActiveTab(e.id)}
              className={`flex-1 fs-5 text-primary transition ${isActvieTab(
                e.id
              )}`}
            >
              {e.title}
            </button>
          ))}
        </div>
        <div className="p-3">
          <ActiveTabComponent info={product.info} desc={product.description} />
        </div>
      </div>
    </div>
  );
}
