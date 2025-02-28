import { Row, Col } from 'react-bootstrap';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import Loader from '../components/Loader';

const HomeScreen = () => {
  {/* Fetch the products using the useGetProductsQuery hook */}
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {/* If loading, show a loading message. 
        * If there is an error, show the error message.
        * Otherwise, display the products in a grid layout.
      */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;