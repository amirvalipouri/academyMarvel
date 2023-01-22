import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ProductCard } from "../../../components";
import { axios } from "../../../boot";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    const url = "/pub/shop/products";
    const params = { perPage: 4 };
    axios.get(url, { params }).then((res) => {
      const data = res.data.data.map((e) => ({
        ...e,
        _id: `/products/${e._id}`,
      }));
      setProducts(data);
    });
  };
  useEffect(getProducts, []);
  return (
    <Container className="d-flex flex-column flex-center row-gap-4">
      <h4 className="text-info text-center">فروشگاه مارول</h4>
      <Row>
        {products.map((e) => (
          <Col key={e._id} xs="12" md="6" lg="4" xl="3">
            <ProductCard {...e} />
          </Col>
        ))}
        <Col xs="12" className="d-flex flex-center">
          <Link to="/products" className="Button btn btn-primary">
            مشاهده بیشتر
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
