const mongoose = require('mongoose');
const User = require('../models/user');
const seed = require('./seed-database');
const Profile = require('../models/profile');

beforeAll(async()=>{
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    await seed();
});

afterAll(async()=>{
    await mongoose.connection.close();
});

describe("Sanity Check", ()=>{
    it("must pass", async ()=>{
        const user = await User.find({});
        expect(user.length).toBeGreaterThan(0);
    });
});

describe("Profile model", ()=>{
    it("should be automatically created at user creation", async ()=>{
        const user = await User.findOne({});
        const profile = await Profile.findOne({user:user._id});
        expect(profile).not.toBeNull();
    });

    it("should not be re-created when user is updated", async ()=>{
        const user = await User.findOne({});
        const profile = await Profile.findOne({user:user._id});
        user.displayName = "new display name";
        await user.save();
        const allProfiles = await Profile.find({});
        expect(allProfiles.length).toBe(1);
        expect(allProfiles[0]._id.equals(profile._id)).toBeTruthy();
    });
});

