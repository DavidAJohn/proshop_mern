import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match }) => {
    const orderId = match.params.id;
    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        if(!order || order._id !== orderId || successPay) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if(!window.paypal) {
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay]);

    const currencyFormatter = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    });

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    return loading ? (<Loader />) 
        : error ? (<Message variant='danger'>{error}</Message>) 
        : (
        <>
            <h1>Order Details</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order ID: {order._id}</h2>
                            <h2>Shipping</h2>
                            <p>
                                <span className='font-weight-bold'>Name:</span> {order.user.name}
                            </p>
                            <p>
                                <span className='font-weight-bold'>Email:</span>{' '}
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <span className='font-weight-bold'>Address:</span>
                                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Dispatched on {formatDate(order.deliveredAt)}</Message>
                            : <Message variant='danger'>Not Yet Dispatched</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <span className='font-weight-bold'>Method:</span>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {formatDate(order.paidAt)}</Message>
                            : <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>This order is empty</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item) => (
                                            <ListGroup.Item key={item.product}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x £{item.price} = {' '}
                                                        <span className='font-weight-bold'>
                                                            £{item.qty * item.price}
                                                        </span>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{currencyFormatter.format(order.itemsPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>{currencyFormatter.format(order.shippingPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>VAT</Col>
                                    <Col>{currencyFormatter.format(order.taxPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>{currencyFormatter.format(order.totalPrice)}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler} 
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen;
