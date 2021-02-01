import React, { useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { adminListOrders } from '../actions/orderActions';

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderAdminList = useSelector(state => state.orderAdminList);
    const { loading, error, orders } = orderAdminList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(adminListOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);
    
    const currencyFormatter = new Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 2
    });

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : 
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Sent</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{formatDate(order.createdAt)}</td>
                            <td>{currencyFormatter.format(order.totalPrice)}</td>
                            <td>
                                {order.isPaid 
                                ? (formatDate(order.paidAt)) 
                                : (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                }
                            </td>
                            <td>
                                {order.isDelivered 
                                ? (formatDate(order.deliveredAt)) 
                                : (<i className='fas fa-times' style={{color: 'red'}}></i>)
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/admin/order/${order._id}/view`}>
                                    <Button variant='light' className='btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
            }
        </>
    )
}

export default OrderListScreen;
