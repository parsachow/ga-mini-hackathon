require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const sanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');

// INFRASTRUCTURE
require('./config/db');
require('./config/passport');

// ROUTES
const menuItemRouter = require('./routes/menuItem-router');
const ordersRouter = require('./routes/order-router');
const profileRouter = require('./routes/profile-router');

const DEBUG = process.env.NODE_ENV ? !process.env.NODE_ENV.toLocaleLowerCase() === 'production' : true;
const PORT = process.env.PORT || 3001;

const app = express();

// MIDDLEWARE
app.use(logger(DEBUG ? 'dev' : 'short'));
app.use(express.json());
app.use(favicon(path.join(__dirname, '../build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(sanitize());
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// not really necessary since we won't allow forms to be submitted per React's controlled input logic
app.use(express.urlencoded({ extended: true }));

// we don't really need CORS middleware since we're doing a single project,
// will introduce security issues
app.use(cors());

// morgan is already mounted, it's the very first middleware
//app.use(morgan("dev"));

// API ROUTES
app.use('/menu', menuItemRouter);
app.use('/orders', ordersRouter);
app.use('/profile', profileRouter);

// CATCH-ALL ROUTE FOR REACT-APP
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`);
});