const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const path = require("path")
const flash = require("connect-flash");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const {check, validationResult} = require("express-validator")
const passport = require("passport");
require("dotenv").config();
require("./config/dbConnection.js")();
require("./config/passport.js")(passport);



const app = express();

app.set("view engine","ejs")
app.set("views","./views")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')))
// app.use(expressLayouts);
app.use("/assets", express.static(__dirname + "/assets"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));
app.use((req, res, next) => {
	req.user = req.user;
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	res.locals.warning = req.flash("warning");
	next();
});

const home = (req,res)=>{
    return res.render("home")
}

app.get("/",home)
app.use("/", require("./routes/admin"));
app.use("/", require("./routes/admin_cloth"));
app.use("/", require("./routes/agent"));
app.use("/", require("./routes/donor"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/cloth"));
app.use("/", require("./routes/transport"));



const port = 3000;
app.listen(port,()=>{
    console.log("port on 3000");
})
