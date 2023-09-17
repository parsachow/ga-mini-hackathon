const mongoose = require('mongoose');
const menuItemSchema = require('./menuItemSchema');

// won't have a controller of its own so no need to export as model
const orderItemSchema = new mongoose.Schema(
    {
        menuItem: menuItemSchema,
        quantity: {
            type: Number,
            required: true,
            default: 1,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

orderItemSchema.virtual('extPrice').get(function () {
    return this.quantity * this.menuItem.price * (1 - this.menuItem.discount);
});

const orderSchema = new mongoose.Schema(
    {
        orderDate: Date,
        orderStatus: {
            type: String,
            enum: ['incomplete', 'received', 'preparing', 'delivering', 'delivered'],
            default: 'incomplete'

        },
        isPaid: { type: Boolean, required: true, default: false },
        orderItems: [
            orderItemSchema
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

orderSchema.virtual("orderTotal").get(function () {
    return this.orderItems.reduce((sum, item) => sum + item.extPrice, 0);
});

orderSchema.virtual("totalQty").get(function () {
    return this.orderItems.reduce((total, item) => total + item.quantity, 0);
});

// static method to get the user's unpaid order, a.k.a the cart
orderSchema.statics.getCart = function (userId) {
    return this.findOneAndUpdate(
        // query
        { user: userId, isPaid: false },
        // update document - provides values when inserting
        // we're doing this so it gets inserted for a new order
        { user: userId },
        // upsert option creates a document if it doesn't exist
        { upsert: true, new: true }
    );
}

// instance method to add items to the cart
orderSchema.methods.addItemToCart = async function (menuItemId) {
    const cart = this; // order document

    // Check if the item already exists in the cart
    const orderItem = cart.orderItems.find(orderItem => orderItem.menuItem._id.equals(menuItemId));
    if (orderItem) {
        // It already exists, so increase the qty
        orderItem.quantity += 1;
    } else {
        // Get the item from the "catalog"
        // Note how the mongoose.model method behaves as a getter when passed one arg vs. two
        const Item = mongoose.model('MenuItem');
        const item = await Item.findById(menuItemId);
        cart.orderItems.push(item);
    }
    return cart.save();
}
// instance method to change quantity of menuItems in the cart
orderSchema.methods.setItemQty = async function (itemId, newQty) {
    const cart = this;
    const orderItem = cart.orderItems.find(orderItem => orderItem.menuItem._id.equals(itemId));
    if (orderItem && newQty <= 0) {
        await orderItem.deleteOne();
    } else if (orderItem) {
        orderItem.quantity = newQty;
    }
    return cart.save();
}




module.exports = mongoose.model('Order', orderSchema);