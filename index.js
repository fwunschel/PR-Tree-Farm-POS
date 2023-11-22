if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;


const session = require('express-session');
const MongoStore = require('connect-mongo');


const flash = require('connect-flash');
const path = require('path');

// const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');

const passport = require('passport');
const localPassport = require('passport-local');
//const passportLM = require('passport-local-mongoose');
// const User = require('./models/user');
// const userRoutes = require('./routes/users');


const Product = require('./models/products');
const User = require('./models/users');
const Sale = require('./models/sales');


const { get } = require('http');

///middleware and error catch
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');
const { isLoggedIn } = require('./utilities/middleware');
const { object } = require('joi');


const productRoutes = require('./routes/products')
const posRoutes = require('./routes/POS')
const cartRoutes = require('./routes/cart')
const salesRoutes = require('./routes/sales')
const userRoutes = require('./routes/users')



const prodUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/PR-tree-farm'
//mongoose bootup
mongoose.connect(prodUrl)
    .then(() => {
        console.log('Mongo Connection Open');
    }).catch(err => {
        console.log('Oh No Mongo Error');
        console.log('make sure it\'s running')
        console.log(err)
    });
/// App construction
const app = express();
app.set(path.join(__dirname, 'views'));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

const secret = process.env.secret || 'thisshouldbeabettersecret!'

const store = MongoStore.create({
    mongoUrl: prodUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});

const sessionConfig = {
    store,
    name: 'holder726',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure:true,
        expires: Date.now() + (1000 * 60 * 60 * 24 * 7),//expires a week from now
        maxAge: 1000 * 60 * 60 * 24 * 7,


    }
    //store:

}
app.use(session(sessionConfig));//used to set up session- alternative throughline to cookies
app.use(flash());//flash messages

app.use(passport.initialize());//passport
app.use(passport.session());//middleware if we want persistent login sessions  MUST GO AFTER session()^
passport.use(new localPassport(User.authenticate()));//put user model in there
//^this is saying that we want to use local model with authentication off the User Model DB

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.delete = req.flash('delete');
    next();
});

//general routes
app.get('/', isLoggedIn, (req, res) => {
    res.render('homepage', { username: req.user.username });
})
///products functionality Routes
app.use('/products', productRoutes);
///POS functionality Routes
app.use('/POS', posRoutes);
//cart routes
app.use('/cart', cartRoutes);

///sale routes
app.use('/sales', salesRoutes);

///Login Routes
app.use('/', userRoutes);



app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    if (!err.statusCode) err.statusCode = 500;
    if (!err.message) err.message = 'Something Went Wrong'
    res.status(err.statusCode).render('error', { err });
})


app.listen(port, () => {
    console.log(`You are connected to port:${port}`);
});



