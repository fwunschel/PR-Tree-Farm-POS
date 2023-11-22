const passport = require('passport');
const localPassport = require('passport-local');
const { countries } = require('../seeds/countries');
const User = require('../models/users');

module.exports.getRegister = (req, res) => {
    res.render('users/register', { countries })
}

module.exports.register = async (req, res, next) => {
    const { username, name, password, company, country, email } = req.body.user;
    const newUser = new User({ username, name, company, country, email, cart: [], custom: [] });
    console.log(newUser);
    try {
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser)
        req.login(registeredUser, err => {
            if (err) return next(err);
            console.log(registeredUser);
            req.flash('success', `Welcome to POS ${name}`)
            res.redirect('/');
        });

    }
    catch (e) {
        console.log(e);
        if (e.code == 11000) {
            req.flash('error',
                `An account has already been created with the email: ${e.keyValue.email}, 
            please login to that account`);
        }
        else {
            req.flash('error', e.message);
        }

        res.redirect('/register')
    }
}

module.exports.getLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back')
    res.redirect('/')
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    }
    )
}