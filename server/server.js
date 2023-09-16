require('dotenv').config();
const path = require('path');
const express = require('express');
const logger = require('morgan');
const favicon = require('serve-favicon');
const sanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');

require('./persistence/db');

const DEBUG = process.env.NODE_ENV ? !process.env.NODE_ENV.toLocaleLowerCase() === 'production' : true;
const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger(DEBUG ? 'dev' : 'short'));
app.use(express.json());
app.use(favicon(path.join(__dirname, '../build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(sanitize());
app.use(cookieParser());

// API ROUTES


// CATCH-ALL ROUTE FOR REACT-APP
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Express app running on port ${PORT}`);
});