const mongoose = require ('mongoose');

const addressSchema = mongoose.Schema(
    {
        street: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        zip: {type: String, required: true},
        uesrId: {
            type: mongoose.Schema.Types.ObjectId
        }
    }
)

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        savedOrders: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        favItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem'
        },
        address: [addressSchema]
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Profile', profileSchema)