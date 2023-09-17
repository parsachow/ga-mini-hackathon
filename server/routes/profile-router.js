///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express');
const router = express.Router();

const profileCtrl = require('../controllers/profile-controller');

///////////////////////////////
// ROUTES
////////////////////////////////

// GET /profile
router.get('/',profileCtrl.getProfile);
// POST /profile/orders
router.post('/orders',profileCtrl.saveOrder);
// DELETE /profile/orders/:id
router.delete('/orders/:id',profileCtrl.deleteSavedOrder);
// POST /profile/favorites
router.post('/favorites',profileCtrl.saveMenuItem);
// DELETE /profile/favorites/:id
router.delete('/favorites/:id',profileCtrl.deleteSavedMenuItem);
// POST /profile/addresses
router.post('/addresses',profileCtrl.saveAddress);
// PUT /profile/addresses/:id
router.put('/addresses/:id',profileCtrl.changeAddress);
// DELETE /profile/addresses/:id
router.put('/addresses/:id',profileCtrl.deleteAddress);

module.exports = router;