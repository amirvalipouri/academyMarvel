import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BlogCard } from "../../../components";
import { axios } from "../../../boot";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = () => {
    const url = "/pub/blog";
    axios.get(url).then((res) => {
      const data = res.data.data.map((e) => ({
        ...e,
        _id: `/blog/${e._id}`,
      }));
      const start = data.length - 3;
      const end = data.length;
      setBlogs(data.splice(start, end));
    });
  };
  useEffect(getBlogs, []);
  return (
    <Container className="d-flex flex-column flex-center text-center row-gap-4">
      <h4 className="text-info">آخرین ها از وبلاگ</h4>
      {/* <p>
        متن مورد نظر در اینجا قرار میگیرد متن مورد نظر در اینجا قرار میگیرد متن
        مورد نظر در اینجا قرار میگیرد
      </p> */}
      <Row>
        {blogs.map((item) => (
          <Col key={item._id} xs="12" md="6" lg="4" xl="3">
            <BlogCard {...item} />
          </Col>
        ))}
        <Col xs="12" className="d-flex flex-center">
          <Link to="/blog" className="Button btn btn-primary">
            مشاهده بیشتر
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
