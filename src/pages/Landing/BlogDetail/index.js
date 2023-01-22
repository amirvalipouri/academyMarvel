import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { BgImage, Video } from "../../../components";
// import { BgImage, Button, CommentBox, Pagination } from "../../../components";
import { axios } from "../../../boot";
import noteIcon from "../../../assets/icons/note.svg";
import "./index.scss";

export default function BlogDetail() {
  const params = useParams();
  const [detail, setDetail] = useState({});
  const getDetail = () => {
    const url = `/pub/blog/${params.id}`;
    axios.get(url).then(({ data }) => {
      setDetail(data);
    });
  };
  const showDate = (date = "") => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const dateValue = new Date(date);
    return dateValue.toLocaleDateString("fa-IR", options);
  };
  useEffect(getDetail, []);
  return (
    <Container className="BlogDetail mt-5">
      <img className="w-100 rounded-10" src={detail.img} alt="testImage" />
      <div className="blog-title w-100 px-1 px-md-5">
        <div className="w-100 position-relative d-flex flex-column row-gap-5 bg-primary rounded overflow-hidden p-4">
          <BgImage type={1} objectFit="cover" className="w-100 h-100" />
          <h3 className="text-white fs-md-1">{detail.title}</h3>
          <Row className="align-items-center">
            <Col xs="12" md="6">
              <div className="w-fit d-flex flex-center col-gap-2">
                <i
                  style={{ width: "50px", height: "50px" }}
                  className="bi bi-person d-flex flex-center rounded-circle border border-2 border-white text-white fs-3"
                />
                <h6 className="text-white">{detail.author}</h6>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="w-fit d-flex flex-center col-gap-2 me-md-auto">
                <img width="24" src={noteIcon} alt="noteIcon" />
                <h6 className="text-white">{showDate(detail?.createdAt)}</h6>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {detail?.full?.map((item, index) => (
        <div key={index} className="d-flex flex-column gap-4 my-5">
          <h5>{item.header}</h5>
          {item.img && (
            <div className="w-100 rounded border border-2 border-primary p-1 shadow">
              <img className="w-100 rounded" src={item.img} alt={item.header} />
            </div>
          )}
          <p className="text-justify">{item.body}</p>
          {item.vid && (
            <div className="w-100 rounded border border-2 border-primary p-1 shadow">
              <Video
                sources={[
                  {
                    src: item.vid,
                    size: 720,
                  },
                ]}
                className="w-100 rounded"
              />
            </div>
          )}
        </div>
      ))}
      {/* <div className="w-100 my-4 rounded border border-primary p-2 d-flex flex-wrap align-items-center gap-2">
        <h6 className="text-info">برچسب‌ها:</h6>
        <div className="bg-primary bg-opacity-10 text-info rounded px-3 py-2 white-space-nowrap">
          علم و تکنولوژی
        </div>
        <div className="bg-primary bg-opacity-10 text-info rounded px-3 py-2 white-space-nowrap">
          مقاله
        </div>
        <div className="bg-primary bg-opacity-10 text-info rounded px-3 py-2 white-space-nowrap">
          کتابینو
        </div>
      </div>
      <Row className="bg-white rounded py-2 shadow-sm">
        <Col
          xs="12"
          lg="8"
          className="d-flex white-space-nowrap align-items-center col-gap-3 overflow-auto px-2 py-3"
        >
          <h6 className="text-info">مرتب سازی دیدگاه‌ها بر اساس:</h6>
          <button className="text-primary border-0 bg-transparent fw-bold">
            جدیدترین دیدگاه‌ها
          </button>
          <button className="text-primary border-0 bg-transparent">
            مفید ترین دیدگاه‌ها
          </button>
        </Col>
        <Col xs="12" lg="4">
          <Button className="d-block ms-auto me-auto ms-lg-0">
            ثبت دیدگاه
          </Button>
        </Col>
        <Col xs="12" className="d-flex flex-column flex-ceneter row-gap-3">
          {[0, 1, 2].map((index) => (
            <CommentBox key={index} />
          ))}
          <Pagination />
        </Col>
      </Row> */}
    </Container>
  );
}
