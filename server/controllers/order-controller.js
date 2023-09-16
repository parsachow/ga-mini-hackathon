const Order = require('../models/order');


// A cart is the unpaid order for a user
async function getCart(req, res) {
    try {
        res.json(
            await Order.getCart(req.user._id)
        );
    } catch (error) {
        res.status(400).json(error);
    }
}

// Add an item to the cart
async function addToCart(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        await cart.addItemToCart(req.params.id);
        res.json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        await cart.setItemQty(req.body.itemId, req.body.newQty);
        res.json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        cart.isPaid = true;
        cart.orderStatus = 'received';
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Dummy functions to set order status for order tracking
async function startOrderPrep(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        order.orderStatus = 'preparing';
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json(error);
    }
}
async function startOrderDelivery(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        order.orderStatus = 'delivering';
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json(error);
    }
}
async function completeOrderDelivery(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        order.orderStatus = 'delivered';
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Past orders index
async function index(req, res) {
    try {
        res.json(
            await Order.find({ userId: req.user._id, isPaid: true })
        );
    } catch (error) {
        res.status(400).json(error);
    }
}

// Order details
async function detail(req, res) {
    try {
        res.json(
            await Order.findById(req.params._id)
        )
    } catch (error) {
        res.status(400).json(error);
    }
}



module.exports = {
    // CART
    getCart,
    addToCart,
    setItemQtyInCart,
    checkout,
    // PAST ORDERS
    index,
    detail,
    // RESTAURANT SIDE (DUMMY)
    startOrderPrep,
    startOrderDelivery,
    completeOrderDelivery,
}