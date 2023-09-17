// const mongoose = require('mongoose');
const User = require('../models/user');
const MenuItem = require('../models/menuItem');
const Order = require('../models/order');
const Profile = require('../models/profile');

const seedDatabase = async () => {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      MenuItem.deleteMany({}),
      Order.deleteMany({}),
      Profile.deleteMany({}),
    ]);
  
    // Create User (Profile will be auto-created)
    await User.create({
      displayName: 'John Doe',
      googleId: '123456789',
      avatar: 'avatar_url'
    });
  
    // Create multiple MenuItems
    const menuItems = await MenuItem.insertMany([
      {
        name: 'Burger',
        price: 5.99,
        discount: 0.1,
        description: 'Delicious beef burger',
        foodCategory: 'Fast Food',
        imageUrl: 'burger_url',
        imageDescription: 'Tasty burger'
      },
      {
        name: 'Pizza',
        price: 8.99,
        discount: 0,
        description: 'Cheesy pizza',
        foodCategory: 'Italian',
        imageUrl: 'pizza_url',
        imageDescription: 'Cheese pizza'
      }
    ]);
  
    // Create multiple Orders
    await Order.insertMany([
      {
        orderDate: new Date(),
        orderStatus: 'incomplete',
        isPaid: false,
        orderItems: [
          { menuItem: menuItems[0].toObject(), quantity: 2 },
          { menuItem: menuItems[1].toObject(), quantity: 1 }
        ]
      }
    ]);
  };
  
  module.exports = seedDatabase;