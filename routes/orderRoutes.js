const express = require('express');
const funcs = require('../controllers/orderController');
const router = express.Router();

const getOrderDetails = funcs.getOrderDetails;
const getOrderProductsDetails = funcs.getOrderProductsDetails;
const saveOrderDetails = funcs.saveOrderDetails;
const updateOrderStatus = funcs.updateOrderStatus;

router.get('/fetch', getOrderDetails);
router.post('/save', saveOrderDetails);
router.put('/status', updateOrderStatus);
router.get('/:orderId', getOrderProductsDetails);

module.exports = router;
