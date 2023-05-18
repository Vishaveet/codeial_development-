const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;

const db = require('./config/mongoose');

const session = require('express-session');

const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo'); // pass session as an argument here
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const app = express();
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(express.static('./assets'));
app.use(expressLayouts);
// Making uploaded files available for browser
app.use('/uploads',express.static(__dirname + '/uploads'));

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name:'Authentication',
    // Change the secret before deployment
    secret:'blahblahblah',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100),
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/Authentication',
        autoRemove: 'disabled'
    }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash);
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log("Error Creating Server!", err);
        return;
    }
    console.log("Server is running at port:", port);
});
