const mongoose = require('mongoose');

const addressSchema = mongoose.Schema(
    {
        name: {type: String},
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
profileSchema.methods.saveOrder = async function(orderId){
    const existingOrders = new Set(this.savedOrders);
    existingOrders.add(orderId);
    this.savedOrders = [...existingOrders];
    return await this.save();
}

// Save a menu item
profileSchema.methods.saveFavItem = async function(itemId){
    const existingItems = new Set(this.favItems);
    existingItems.add(itemId);
    this.favItems = [...existingItems];
    return await this.save();
}

// Remove an order from saved orders
profileSchema.methods.removeSavedOrder = async function(orderId){
    const existingOrders = new Set(this.savedOrders);
    existingOrders.delete(orderId);
    this.savedOrders = [...existingOrders];
    return await this.save();
}

// Remove a favItem
profileSchema.methods.removeFavItem = async function(itemId){
    const existingItems = new Set(this.favItems);
    existingItems.delete(itemId);
    this.favItems = [...existingItems];
    return await this.save();
}

// Change an existing address or create a new one
profileSchema.methods.changeAddress = async function (addressId, newAddressData){
    let address = this.addresses.find((address) => address._id.equals(addressId));
    if(address){
        address = {
            ...address,
            ...newAddressData
        }
    }else{
        const Address = mongoose.model('Address', addressSchema);
        address = new Address(newAddressData);
        this.addresses.push(address);
    }
    return await this.save();
}

// Delete an existing address
profileSchema.methods.deleteAddress = async function (addressId){
    const index = this.addresses.findIndex(address => address._id.equals(addressId));
    if(index > -1){
        this.addresses.splice(index,1);
    }
    return await this.save();
}

module.exports = profileSchema;