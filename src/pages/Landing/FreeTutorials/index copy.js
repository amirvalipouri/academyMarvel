import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Pagination, BlogCard } from "../../../components";
import { axios } from "../../../boot";
import { source } from "../../../methods";
export default function FreeTutorials() {
  const [categories, setCategories] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [pages, setPages] = useState({});
  const [params, setParam] = useState({
    // sort: "createdAt:-1",
    perPage: 6,
    page: 1,
    category: undefined,
  });
  const sortItems = [
    {
      name: "جدیدترین‌ها",
      id: "createdAt:-1",
    },
    {
      name: "اولویت بالا",
      id: "priority:-1",
    },
    {
      name: "پر بازدیدترین‌ها",
      id: "views:-1",
    },
  ];
  const getCategories = () => {
    const url = "/pub/categories";
    axios.get(url).then((res) => {
      const data = res.data.data.map((e) => ({
        name: e.title_fa,
        id: e.title,
      }));
      setCategories(data);
    });
  };
  const getTutorials = () => {
    const url = "/pub/videos";
    axios.get(url, { params }).then(({ data }) => {
      setTutorials(data.data);
      setPages(data.pages);
    });
  };

  useEffect(getCategories, []);
  useEffect(getTutorials, [params]);
  return (
    <Container>
      <Row>
        <div className="sort-items-section col-12 d-flex align-items-center col-gap-5 overflow-auto p-3">
          <h6 className="text-info lh-normal m-0 white-space-nowrap">
            مرتب سازی بر اساس:
          </h6>
          {sortItems.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setParam((p) => ({ ...p, page: 1, sort: item.id }))
              }
              className={`position-relative white-space-nowrap px-1 py-2 border-0 transition ${
                params.sort === item.id ? "active text-info" : "text-secondary"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="sort-items-section col-12 d-flex align-items-center col-gap-5 overflow-auto p-3">
          <h6 className="text-info lh-normal m-0 white-space-nowrap">
            دسته‌بندی:
          </h6>
          {categories.map((item) => (
            <button
              key={item.id}
              onClick={() =>
                setParam((p) => ({ ...p, page: 1, category: item.id }))
              }
              className={`position-relative white-space-nowrap px-1 py-2 border-0 transition ${
                params.category === item.id
                  ? "active text-info"
                  : "text-secondary"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </Row>
      <Row className="my-4">
        {tutorials.map((video) => (
          <Col key={video._id} xs="12" md="6" lg="4" xl="3">
            <BlogCard
              _id={video._id}
              img={source(video.thumbnail)}
              title={video.title}
              description={video.description}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        totalPages={pages.totalPages}
        activePage={params.page}
        setActivePage={(page) => setParam((p) => ({ ...p, page }))}
      />
    </Container>
  );
}
