import React, { useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col, Modal } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Paginate from '../components/Paginate';

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const pageNumber = match.params.pageNumber || 1;

    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages, count, pageSize } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [productId, setProductId] = useState();

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if (!userInfo.isAdmin) {
            history.push('/login');
        } 

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`);
        } else {
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber]);
    
    const createProductHandler = () => {
        dispatch(createProduct());
    };
   
    const cancelConfirmModal = () => {
        setModalIsOpen(false);
    };

    const deleteRequestHandler = (id) => {
        setProductId(id);
        setModalIsOpen(true);
    };

    const confirmDeleteHandler = () => {
        dispatch(deleteProduct(productId));
        setModalIsOpen(false);
    };

    return (
        <>
            <Modal
                show={modalIsOpen}
                onHide={cancelConfirmModal}
            >
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you really want to delete this product?</Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' className='btn-sm' onClick={confirmDeleteHandler}>Yes, delete it</Button>
                    <Button variant='light' className='btn-sm' onClick={cancelConfirmModal}>No, cancel</Button>
                </Modal.Footer>
            </Modal>

            <Row className='align-item-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>£{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteRequestHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} page={page} count={count} pageSize={pageSize} />
            </> 
            }
        </>
    )
}

export default ProductListScreen;
