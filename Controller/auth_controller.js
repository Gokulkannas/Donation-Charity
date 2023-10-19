const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const middleware = require("../middleware/index.js")


exports.getRegister = async (req,res) =>{
    return res.render("register");
}

exports.postRegister = async (req,res)=>{
    const { firstName, email, password1, password2, role } = req.body;
	let errors = [];
	
	if (!firstName  || !email || !password1 || !password2) {
		errors.push({ msg: "Please fill in all the fields" });
	}
	if (password1 != password2) {
		errors.push({ msg: "Passwords are not matching" });
	}
	if (password1.length < 4) {
		errors.push({ msg: "Password length should be atleast 4 characters" });
	}
	if(errors.length > 0) {
		return res.render("register", {
			title: "User register",
			errors, firstName, email, password1, password2
		});
	}
	
	try
	{
		const user = await User.findOne({ email: email });
		if(user)
		{
			errors.push({msg: "This Email is already registered. Please try another email."});
			return res.render("register", {
				title: "User Register",
				firstName, errors, email, password1, password2
			});
		}
		
		const newUser = new User({ firstName, email, password:password1, role });
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(newUser.password, salt);
		newUser.password = hash;
		await newUser.save();
		req.flash("success", "You are successfully registered and can log in.");
		res.redirect("/login");
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.getLogin = (req,res) =>{
	return res.render("login",{ message: req.flash('error') });
}

exports.postLogin = (req,res) => {
	res.redirect(req.session.returnTo || `/${req.user.role}`);
}

exports.getLogout = (req, res) => {
	req.logout((err) => {
		if (err) {
			console.error("Error during logout:", err);
			return res.status(500).send("Internal Server Error");
		}
		
		req.flash("success", "Logged-out successfully");
		res.redirect("/");
	});
};
	