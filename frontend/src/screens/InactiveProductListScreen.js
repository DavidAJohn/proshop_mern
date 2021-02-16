import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col, Modal } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listInactiveProducts, activateProduct } from '../actions/productActions';
import Paginate from '../components/Paginate';

const InactiveProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const pageNumber = match.params.pageNumber || 1;

    const productListInactive = useSelector(state => state.productListInactive);
    const { loading, error, products, page, pages, count, pageSize } = productListInactive;

    const productActivate = useSelector(state => state.productActivate);
    const { loading: loadingActivate, error: errorActivate, success: successActivate } = productActivate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productId, setProductId] = useState();
    const [productName, setProductName] = useState();

    useEffect(() => {
        dispatch(listInactiveProducts());

        if (successActivate) {
            dispatch(listInactiveProducts('', pageNumber));
        }
    }, [dispatch, history, userInfo, pageNumber, successActivate]);
   
    const cancelConfirmModal = () => {
        setModalIsOpen(false);
    };

    const activateRequestHandler = (id, name) => {
        setProductId(id);
        setProductName(name);
        setModalIsOpen(true);
    };

    const confirmActivateHandler = () => {
        dispatch(activateProduct(productId));
        setModalIsOpen(false);
    };

    return (
        <>
            <Modal
                size='lg'
                show={modalIsOpen}
                onHide={cancelConfirmModal}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Do you really want to re-activate '{productName}'?</h5>
                    <p>It will immediately become visible to customers when purchasing.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' className='btn-sm' onClick={confirmActivateHandler}>Yes, re-activate it</Button>
                    <Button variant='light' className='btn-sm' onClick={cancelConfirmModal}>No, cancel</Button>
                </Modal.Footer>
            </Modal>

            <Row className='align-item-center'>
                <Col>
                    <h1>Inactive Products</h1>
                </Col>
                <Col className='text-right'>
                    <Link to='/admin/productlist' className='btn btn-light my-3'>
                        Go Back
                    </Link>
                </Col>
            </Row>
            {loadingActivate && <Loader />}
            {errorActivate && <Message variant='danger'>{errorActivate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
            : 
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? 
                        (products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>£{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Button variant='success' className='btn-sm' onClick={() => activateRequestHandler(product._id, product.name)}>
                                        <i className='fas fa-check'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))) : (
                            <tr >
                                <td colSpan='6'>There are currently no inactive products</td>
                            </tr>
                        )}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} count={count} pageSize={pageSize} />
            </> 
            }
        </>
    )
}

export default InactiveProductListScreen;
