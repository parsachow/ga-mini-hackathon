const mongoose = require ('mongoose');
const profileSchema = require('./profileSchema');

const userSchema = new mongoose.Schema(
    {
        displayName: String,
        googleId: {
            type: String,
            required: true
        },
        avatar: String,
        email: String,
    }, 
    {
        timestamps: true,
    },
);

userSchema.pre("save",async function(next){
    if(this.isNew){
        const Profile = mongoose.model('Profile',profileSchema);
        await Profile.create({user:this._id});
    }
    next();
});


module.exports = mongoose.model("User", userSchema);