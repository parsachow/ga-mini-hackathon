const Profile = require('../models/profile');

// GET ALL PROFILE INFO FOR USER
async function getProfile(req,res){
    try {
        res.json(
            await Profile.findOne({user: req.user._id})
        );
    } catch (error) {
        res.status(400).json(error);
    }
}

// HELPER
async function getProfileOrError(user){
    const userProfile = await Profile.findOne({user});
    if(!userProfile) throw new Error('User Profile unavailable');
    return userProfile;
}

// SAVE AN ORDER
async function saveOrder(req,res){
    try {
        const userProfile = getProfileOrError(req.user._id);
        await userProfile.saveOrder(req.params.id);
        res.json(userProfile);
    } catch (error) {
        res.status(400).json(error);
    }
}

// SAVE A MENUITEM
async function saveMenuItem(req,res){
    try {
        const userProfile = getProfileOrError(req.user._id);
        await userProfile.saveFavItem(req.params.id);
        res.json(userProfile);
    } catch (error) {
        res.status(400).json(error)
    }
}

// DELETE A SAVED ORDER
async function deleteSavedOrder(req,res){
    try {
        const userProfile = getProfileOrError(req.user._id);
        await userProfile.removeSavedOrder(req.params.id);
        res.status(200);
    } catch (error) {
        res.status(400).json(error);
    }
}

// DELETE A SAVED MENUITEM
async function deleteSavedMenuItem(req,res){
    try {
        const userProfile = getProfileOrError(req.user._id);
        await userProfile.removeFavItem(req.params.id);
        res.status(200);
    } catch (error) {
        res.status(400).json(error);
    }
}

// SAVE AN ADDRESS
async function saveAddress(req,res){
    try {
        const userProfile = getProfileOrError(req.user._id);
        await userProfile.changeAddress("a",req.body);
        res.json(userProfile);
    } catch (error) {
        res.status(400).json(error);
    }
}

// UPDATE AN ADDRESS
async function changeAddress(req,res){
    try {
        const userProfile = getProfileOrError(req.user._id);
        await userProfile.changeAddress(req.params.id,req.body);
        res.json(userProfile);
    } catch (error) {
        res.status(400).json(error);
    }
}

// REMOVE AN ADDRESS
async function deleteAddress(req,res){
    try {
        const userProfile = getProfileOrError(req.user._id);
        await userProfile.deleteAddress(req.params.id);
        res.status(200);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = {
    getProfile,
    saveOrder,
    saveMenuItem,
    deleteSavedOrder,
    deleteSavedMenuItem,
    saveAddress,
    changeAddress,
    deleteAddress,
}