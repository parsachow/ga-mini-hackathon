///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express');
const passport = require('passport');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();

///////////////////////////////
// ROUTES
////////////////////////////////

// GET /auth/google
router.get('/google', (req, res) => {
    // generate the google url. Use state as CSRF protection
    const state = crypto.randomBytes(16).toString('hex');
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_CALLBACK}&response_type=code&scope=profile email&state=${state}`
    res.cookie('csrf_token', state, { signed: true, httpOnly: true });
    res.json({ url: authUrl });
});

// GET /auth/google/callback
router.get('/google/callback',
    (req, res, next) => {
        const state = req.query.state;
        const csrf_token = req.signedCookies['csrf_token'];
        if (state === csrf_token) {
            // no CSRF, delegate to passport for rest of the flow
            res.clearCookie('csrf_token');
            next();
        } else {
            // CSRF attack detected
            console.error(`CSRF attack detected from IP: ${req.ip}`);
            res.clearCookie("csrf_token");
            res.status(403).send("Invalid state");
        }
    },
    passport.authenticate('google', { failureRedirect: '/failed', session: false }),
    (req, res) => {
        // success
        const token = createJWT(req.user);
        res.redirect(`${process.env.BASE_URL}/auth/login-success/${token}`);
    });

// Utility function to sign a token
function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = router;