const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index.js")
const passport = require("passport");
const author = require("../Controller/auth_controller");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false})



router.get("/register",middleware.ensureNotLoggedIn,author.getRegister);
router.post("/register",middleware.ensureNotLoggedIn,urlencodedParser,author.postRegister);
router.get("/login",middleware.ensureNotLoggedIn,author.getLogin);
router.post("/login",middleware.ensureNotLoggedIn,
  passport.authenticate('local', {
    successRedirect: '/dash',
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true
  }),
  author.postLogin
);
router.get("/logout",author.getLogout);

module.exports = router;
