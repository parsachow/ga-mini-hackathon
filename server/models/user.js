const mongoose = require ('mongoose');


const userSchema = new mongoose.Schema(
    {
        displayName: String,
        googleId: {
            type: String,
            required: true
        },
        avatar: String
    }, 
    {
        timestamps: true,
    },
);


module.exports = mongoose.model("User", userSchema);