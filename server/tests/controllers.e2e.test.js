const mongoose = require('mongoose');
const User = require('../models/user');
const seed = require('./seed-database');
const Profile = require('../models/profile');
const MenuItem = require('../models/menuItem');
const {configureApp} = require('../server');
const request = require('supertest');
let app;

beforeAll(async()=>{
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
    await seed();
    app = configureApp(async (req,res,next)=>{
        const user = await User.findOne({});
        req.user = user;
        next();
    });
});

afterAll(async()=>{
    await mongoose.connection.close();
});

describe("MenuItem Controller", ()=>{
    it("should allow search of menu items by name", async ()=>{
        const response = await request(app).get("/menu/search/?q=burg");
        expect(response.status).toEqual(200);
        const hamburger = await MenuItem.findOne({name: 'Burger'});
        expect(hamburger._id.equals(response.body[0]._id)).toBeTruthy();
    });

    it("should search menu items by decription", async ()=>{
        const response = await request(app).get("/menu/search/?q=beef");
        expect(response.status).toEqual(200);
        const hamburger = await MenuItem.findOne({name: 'Burger'});
        expect(hamburger._id.equals(response.body[0]._id)).toBeTruthy();
    });
});

describe("Profile Controller", ()=>{
    it("should save a favorite food", async ()=>{
        const pizza = await MenuItem.findOne({name: new RegExp('pizza','i')});
        const response = await request(app).post(`/menu/${pizza._id.toString()}/save`);
        expect(response.status).toEqual(200);
        const profile = await Profile.findOne({});
        expect(profile.favItems.includes(pizza._id.toString())).toBeTruthy();
    });

    it("should not save the same item twice in favorites", async ()=>{
        const pizza = await MenuItem.findOne({name: new RegExp('pizza','i')});
        const response1 = await request(app).post(`/menu/${pizza._id.toString()}/save`);
        expect(response1.status).toEqual(200);
        const response2 = await request(app).post(`/menu/${pizza._id.toString()}/save`);
        expect(response2.status).toEqual(200);        
        const profile = await Profile.findOne({});
        expect(profile.favItems.length).toEqual(1);
    });
});