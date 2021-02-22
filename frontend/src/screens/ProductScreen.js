import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import StarRatings from "react-star-ratings";
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import {Helmet} from "react-helmet";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productCreateReview = useSelector(state => state.productCreateReview);
    const { success: successCreateReview, error: errorCreateReview } = productCreateReview;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (successCreateReview) {
            alert('Review Submitted');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match, successCreateReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }));
    }

    const quantityChangeHandler = (e) => {
        let { value, min, max } = e.target;
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));

        setQty(value);
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    return <>
            <Helmet>
                <title>{ product.name ? `Welcome to ProShop | ${product.name}` : `Welcome to ProShop` }</title>
                <meta name="keywords" content="tech, electronics, phone, console, camera" />
            </Helmet>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading  ? 
            <Loader /> 
            : error 
            ? (<Message variant='danger'>{error}</Message>) : (
            <>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <StarRatings
                                rating={product.rating}
                                starDimension="1rem"
                                starSpacing=".05rem"
                                starRatedColor="rgb(255, 180, 3)"
                            />
                            <div className='my-1'>({product.numReviews} {product.numReviews > 1 ? 'reviews' : 'review'})</div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: £{product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        £{product.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            {product.countInStock > 0 && 
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty (max of 5)</Col>
                                    </Row>
                                    <Row>
                                        <Form.Control 
                                            type='number' 
                                            value={qty} 
                                            onChange={(e) => quantityChangeHandler(e)}
                                            min='1'
                                            max={product.countInStock > 5 ? 5 : product.countInStock}
                                            >
                                        </Form.Control>
                                    </Row>
                                </ListGroup.Item>
                            }
                            <ListGroup.Item>
                                <Button 
                                    onClick={addToCartHandler}
                                    className='btn-block' 
                                    type='button' 
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <div className='font-weight-bold'>{review.name}</div> 
                                <StarRatings
                                    rating={review.rating}
                                    starDimension="1rem"
                                    starSpacing=".15rem"
                                    starRatedColor="rgb(255, 180, 3)"
                                />
                                <p>{formatDate(review.createdAt)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Review</h2>
                            {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control 
                                            as='select' 
                                            value={rating} 
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value=''>-- Select --</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control 
                                            as='textarea' 
                                            row='3' 
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>
                            ) 
                            : <Message>You must be <Link to='/'>logged in</Link> to write a review</Message>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )}
        </>
}

export default ProductScreen;
