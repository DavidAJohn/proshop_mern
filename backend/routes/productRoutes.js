import express from 'express';
const router = express.Router();
import { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    createProduct, 
    updateProduct, 
    createProductReview,
    getTopRatedProducts,
    deActivateProduct,
    activateProduct,
    getInactiveProducts
} from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

router.route('/:id/reviews')
    .post(protect, createProductReview)

router.route('/top')
    .get(getTopRatedProducts)

router.route('/inactive')
    .get(protect, isAdmin, getInactiveProducts)

router.route('/:id/deactivate')
    .put(protect, isAdmin, deActivateProduct)

router.route('/:id/activate')
    .put(protect, isAdmin, activateProduct)

router.route('/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct)

export default router;
