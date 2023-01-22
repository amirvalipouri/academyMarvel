import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { BlogCard } from "../../../components";
import { axios } from "../../../boot";
import "./index.scss";

export default function Blog() {
  const sortItems = [
    {
      label: "جدیدترین مطلب",
      id: 0,
    },
    {
      label: "پربازدیدترین مطلب",
      id: 1,
    },
    {
      label: "منتخب سردبیر",
      id: 2,
    },
    {
      label: "محبوب‌ترین‌ها",
      id: 3,
    },
  ];
  const [blogList, setBlogList] = useState([]);
  const activeBlog = blogList[0];
  const [activeSortItem, setActiveSortItem] = useState(sortItems[0].id);
  const getBlogList = () => {
    const url = "/pub/blog";
    axios.get(url).then(({ data }) => {
      setBlogList(data.data);
    });
  };
  useEffect(getBlogList, []);
  return (
    <Container className="Blog">
      {activeBlog && (
        <Row>
          <Col xs="12" lg="6" className="main-img-section">
            <img
              height="400"
              className="w-100 rounded object-fit-cover shadow transition"
              src={activeBlog.img}
              alt="mainImg"
            />
          </Col>
          <Col xs="12" lg="6" className="main-section position-relative">
            <div className="position-relative d-flex flex-column align-items-start justify-content-center text-start row-gap-4">
              <h1 className="white-space-pre-wrap text-info">
                {activeBlog.title}
              </h1>
              <p className="info w-100 line-clamp-5">
                {activeBlog.description}
              </p>
              <Link to={activeBlog._id ?? ""} className="btn btn-primary px-3">
                بیشتر بخوانیم
              </Link>
            </div>
          </Col>
        </Row>
      )}
      <div className="sort-items-section my-5 d-flex align-items-center col-gap-5 overflow-auto p-3">
        <h6 className="text-info lh-normal m-0 white-space-nowrap">
          مرتب سازی بر اساس:
        </h6>
        {sortItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSortItem(item.id)}
            className={`position-relative white-space-nowrap px-1 py-2 border-0 transition ${
              activeSortItem === item.id ? "active text-info" : "text-secondary"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <Row className="align-items-stretch">
        {blogList.map((blog) => (
          <Col key={blog._id} xs="12" md="6" lg="4" xl="3">
            <BlogCard {...blog} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
