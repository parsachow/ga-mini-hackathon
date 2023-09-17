///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express');
const router = express.Router();

const ordersCtrl = require('../controllers/order-controller');

///////////////////////////////
// ROUTES
////////////////////////////////

// GET /orders/cart
router.get('/cart', ordersCtrl.getCart);
// POST /orders/cart/items/:id
router.post('/cart/items/:id', ordersCtrl.addToCart);
// POST /orders/cart/checkout
router.post('/cart/checkout', ordersCtrl.checkout);
// POST /orders/cart/qty
router.put('/cart/qty', ordersCtrl.setItemQtyInCart);

// GET /orders
router.get('/');
// GET /orders/:id
router.get('/:id');


module.exports = router;