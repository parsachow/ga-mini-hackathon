const mongoose = require ('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderDate: Date,
        orderStatus: String,
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderItem'
            }
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId
        }
    }
);

module.exports = mongoose.model('Order', orderSchema);