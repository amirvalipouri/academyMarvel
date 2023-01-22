import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { axios } from "../../../boot";
import { ProductCard } from "../../../components";

export default function Products() {
  const [products, setProducts] = useState([]);
  const getProducts = () => {
    const url = "/pub/shop/products";
    axios.get(url).then(({ data }) => {
      setProducts(data.data);
    });
  };
  useEffect(getProducts, []);
  return (
    <Row className="wrapper">
      {products.map((e) => (
        <Col key={e._id} xs="12" md="6" lg="4" xl="3">
          <ProductCard {...e} />
        </Col>
      ))}
    </Row>
  );
}
