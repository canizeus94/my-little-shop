import React from 'react';
import { Row, Col } from 'react-bootstrap';
import products from '../components/Product';

const HomeScreen = () => {
  return (
    <>
        <h1>Latest Products</h1>
        {/*Create a Row to contain the products.*/}
        <Row>
            {/*Map through the products and display them in a grid.*/}
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <h3>{product.name}</h3>
                </Col>
            ))}
        </Row>
    </>
  )
}

export default HomeScreen