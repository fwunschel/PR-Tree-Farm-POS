const passport = require('passport');
const localPassport = require('passport-local');
const express = require('express');
const router = express.Router();
// const campgrounds = require('../controllers/p');//controller methods
const user = require('../controllers/users')
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn } = require('../utilities/middleware.js');


router.get('/register', user.getRegister)

router.post('/register', catchAsync(user.register))

router.get('/login', user.getLogin)

router.post('/login',
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)


router.get('/logout', user.logout);


module.exports = router;