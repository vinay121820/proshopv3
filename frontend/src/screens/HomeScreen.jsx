
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useParams } from 'react-router-dom';
import {useGetProductsQuery} from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom';
import ProductCarousel from '../components/ProductCarousel';
//import Meta from '../components/Meta';


const HomeScreen = () => {
  const { pageNumber ,keyword} = useParams();
  const {data, error, isLoading} = useGetProductsQuery({keyword,pageNumber});

  return (
    <>
    {!keyword ? <ProductCarousel/> : <Link to ='/' className="btn btn-light my-3">Go Back</Link>}
    {isLoading ? (
      <Loader/>
    ) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message>) : (
      <>
      
      <h1>Latest Products</h1>
      <Row>
        {data.products.map((product) => (
          <Col key={product._id}  sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
      <Paginate 
      pages={data.pages}
      page={data.page}
      keyword={keyword ? keyword : ""}
      />

  

      </>
    ) }
     
         
    </>
  );
};

export default HomeScreen;
