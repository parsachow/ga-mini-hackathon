///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const menuItemCtrl = require('../controllers/menuItem-controller')

///////////////////////////////
// ROUTES
////////////////////////////////

// MENU ITEM INDEX ROUTE
router.get("/", menuItemCtrl.index);

// MENU ITEM CREATE ROUTE
router.post("/", menuItemCtrl.create);

// MENU ITEM SHOW ROUTE
router.get("/:id", menuItemCtrl.getOne);

// MENU ITEM DELETE ROUTE
router.delete("/:id", menuItemCtrl.delete);

// MENU ITEM UPDATE ROUTE
router.put("/:id", menuItemCtrl.update);

module.exports = router