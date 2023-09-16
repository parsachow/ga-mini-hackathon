const express = require('express')
const MenuItem = require('../models')

// MENU ITEM INDEX ACTION
async function index(req,res,next) {
	try {
    // get all menu items
    res.json(await MenuItem.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// MENU ITEM CREATE ACTION
async function create(req,res,next) {
  try {
    // create new menu item
    res.json(await MenuItem.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// MENU ITEM SHOW ACTION
async function detail(req,res,next) {
    try {
        // send one person
        res.json(await MenuItem.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
};

// MENU ITEM DESTROY ACTION 
async function destroy(req,res,next) {
    try {
      // delete people by ID
      res.json(await MenuItem.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  };

// MENU ITEM UPDATE ACTION
async function update(req,res,next) {
    try {
      // update people by ID, provide the form data, and return the updated document.
      res.json(
        await MenuItem.findByIdAndUpdate(req.params.id, req.body, {new:true})
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  };


// EXPORT Controller Action
module.exports = {
	index,
	create,
	getOne: detail,
    delete: destroy,
	update 
}