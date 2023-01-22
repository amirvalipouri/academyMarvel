import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axios } from "../../../boot";
export default function FreeTutorials() {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    const url = "/pub/categories";
    axios.get(url).then((res) => {
      const data = res.data.data.map((e) => ({
        name: e.title_fa,
        id: e.title,
        img: e.img,
      }));
      setCategories(data);
    });
  };
  useEffect(getCategories, []);
  return (
    <Container>
      <Row>
        {categories.map((item) => (
          <Col key={item.id} xs="12" md="6" lg="4">
            <Link
              key={item.id}
              to={item.id}
              className="d-flex flex-column flex-center gap-4 w-100 bg-white rounded p-2 shadow-sm"
            >
              {item.img ? (
                <img
                  width="50"
                  height="50"
                  className="rounded-circle bg-info object-fit-contain"
                  src={item.img}
                  alt={item.name}
                />
              ) : (
                <i
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                  className="bi bi-journal-bookmark-fill text-white fs-2 bg-info bg-opacity-75 rounded-circle d-flex flex-center"
                />
              )}
              <h5>{item.name}</h5>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
