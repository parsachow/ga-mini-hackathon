const mongoose = require('mongoose')
const menuItemSchema = require('./menuItemSchema');


module.exports = mongoose.model('MenuItem', menuItemSchema)