import express from 'express';
const router = express.Router();
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { 
    addOrderItems, 
    getOrderById, 
    updateOrderToPaid, 
    getUserOrders, 
    getOrders, 
    updateOrderToSent 
} from '../controllers/orderController.js';

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id/view').get(protect, isAdmin, getOrderById);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/sent').put(protect, isAdmin, updateOrderToSent);

export default router;
