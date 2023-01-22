import React, { useEffect } from "react";
import { ProductCard } from "../../../components";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useGetProducts } from "../../../hooks";

export default function Products() {
  const [products, getProducts] = useGetProducts();
  useEffect(getProducts, []);
  return (
    <React.Fragment>
      <div className="w-100 d-flex justify-content-end">
        <Link
          to="new"
          className="bi bi-plus-lg d-flex flex-center fs-4 text-success"
        />
      </div>
      <Row>
        {products.map((e) => (
          <Col key={e._id} xs="12" md="6" lg="4" xl="3">
            <ProductCard {...e} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}
