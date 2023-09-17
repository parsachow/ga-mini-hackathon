const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
    {
        name: { type: String },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        // do we need a userId here if we're embedding this to profile, which already
        // has reference to user?
        userId: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
    }
);

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        savedOrders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        favItems: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuItem'
        }],
        addresses: [addressSchema]
    },
    {
        timestamps: true,
    }
);

// Save an order
profileSchema.methods.saveOrder = async function (orderId) {
    const idx = this.savedOrders.findIndex((order)=>order.equals(orderId));
    if(idx === -1){
        this.savedOrders.push(orderId);
        await this.save();
    }
    return this;
}

// Save a menu item
profileSchema.methods.saveFavItem = async function (itemId) {
    const idx = this.favItems.findIndex((item) => item.equals(itemId));
    if (idx === -1) {
        this.favItems.push(itemId);
        await this.save();
    }
    return this;
}

// Remove an order from saved orders
profileSchema.methods.removeSavedOrder = async function (orderId) {
    const idx = this.savedOrders.findIndex((order)=>order.equals(orderId));
    if(idx>=0){
        this.savedOrders.splice(idx,1);
        await this.save();
    }
    return this;
}

// Remove a favItem
profileSchema.methods.removeFavItem = async function (itemId) {
    const idx = this.favItems.findIndex((item) => item.equals(itemId));
    if(idx >=0){
        this.favItems.splice(idx,1);
        await this.save();
    }
    return this;
}

// Change an existing address or create a new one
profileSchema.methods.changeAddress = async function (addressId, newAddressData) {
    let address = this.addresses.find((address) => address._id.equals(addressId));
    if (address) {
        address = {
            ...address,
            ...newAddressData
        }
    } else {
        const Address = mongoose.model('Address', addressSchema);
        address = new Address(newAddressData);
        this.addresses.push(address);
    }
    return await this.save();
}

// Delete an existing address
profileSchema.methods.deleteAddress = async function (addressId) {
    const index = this.addresses.findIndex(address => address._id.equals(addressId));
    if (index > -1) {
        this.addresses.splice(index, 1);
    }
    return await this.save();
}

module.exports = profileSchema;