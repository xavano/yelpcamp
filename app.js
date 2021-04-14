// DOTENV CONFIGURATION
const dotenv = require('dotenv');
dotenv.config({
    path: './config/config.env'
});

// DEPENDIANCIES
const express        = require("express"),
        app            = express(),
        bodyParser     = require("body-parser"),
        mongoose       = require("mongoose"),
        passport       = require("passport"),
        flash          = require("connect-flash"),
        LocalStrategy  = require("passport-local"),
        methodOverride = require("method-override"), 
        Campground     = require("./models/campground"),
        Comment        = require("./models/comment"),
        User           = require("./models/user"),
        seedDB         = require("./seeds")

// ROUTERS
const commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
    

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// MISC SETUPS
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// SEED
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// LOGIN CHECK
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
});

// ROUTES CONNECT
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// PORT SETUP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

