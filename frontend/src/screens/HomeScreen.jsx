import React, { use } from "react";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
  {/*State to hold the products.*/}
  const [products, setProducts] = useState([]);

  useEffect(() => {
    {/*Fetch products from the API.*/}
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      {/*Create a Row to contain the products.*/}
      <Row>
        {/*Map through the products and display them in a grid.*/}
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;