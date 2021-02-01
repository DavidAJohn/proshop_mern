import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, sentOrder } from '../actions/orderActions';
import { ORDER_SENT_RESET } from '../constants/orderConstants';

const AdminOrderScreen = ({ match, history }) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderSent = useSelector((state) => state.orderSent);
    const { loading: loadingSent, success: successSent } = orderSent;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if(!order || order._id !== orderId || successSent) {
            dispatch({ type: ORDER_SENT_RESET });
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, order, orderId, successSent, userInfo, history]);

    const currencyFormatter = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    });

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    const sentHandler = () => {
        dispatch(sentOrder(order));
    };

    return loading ? (<Loader />) 
        : error ? (<Message variant='danger'>{error}</Message>) 
        : (
        <>
            <Link className='btn btn-light my-3' to='/admin/orderlist'>
                Go Back
            </Link>
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
                            {!order.isDelivered && order.isPaid && userInfo && userInfo.isAdmin && (
                                <ListGroup.Item>
                                    {loadingSent && <Loader />}
                                    <Button type='button' 
                                        className='btn-block' 
                                        onClick={sentHandler}
                                    >
                                        Mark as Dispatched
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default AdminOrderScreen;
