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

// Save an order
async function saveOrder(req,res){
    try {
        const userProfile = await Profile.findOne({user: req.user._id});
        if(!userProfile) throw new Error('User Profile unavailable');
        await userProfile.saveOrder(req.params.id);
        res.json(userProfile);
    } catch (error) {
        res.status(400).json(error);
    }
}



module.exports = {
    getProfile,


}