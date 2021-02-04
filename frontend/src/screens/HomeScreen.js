import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import {Helmet} from "react-helmet";

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages, count, pageSize } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
        <Helmet>
            <title>Welcome to ProShop</title>
            <meta name="keywords" content="tech, electronics, phone, console, camera" />
        </Helmet>
        {!keyword && <ProductCarousel /> }
            <h1>Latest Products</h1>
                {keyword && (
                <>
                <h4>You searched for : "{keyword}"</h4>
                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>
                </>
                )}
                {loading  ? 
                <Loader /> 
                : error 
                ? <Message variant='danger'>{error}</Message> : 
                <>
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='align-items-stretch d-flex'>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} count={count} pageSize={pageSize} keyword={keyword ? keyword : ''} />
                </>
            }
        </>
    )
}

export default HomeScreen
