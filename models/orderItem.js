const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        menuItem: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'MenuItem' },
        quantity: {
            type: Number,
            required: true,
        }
}
);

module.exports = mongoose.model('OrderItem', orderItemSchema);