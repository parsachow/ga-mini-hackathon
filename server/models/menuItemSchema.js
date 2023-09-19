const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
            default: 0.,
        },
        description: {
            type: String,
            required: true,
        },
        foodCategory: String,
        imageUrl: {
            type: String,
            required: true
        },
        imageDescription: {
            type: String,
            required: true
        },
        extras: [String]

    }
);

module.exports = menuItemSchema