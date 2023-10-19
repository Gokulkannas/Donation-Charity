const Clothes = require("../models/clothes.js")
const User = require("../models/user.js");
const mongoose = require("mongoose");

exports.donar_navbar = async (req,res)=>{
    try
	{
		const previousDonations = await Clothes.find({ donor: req.params.id, status: "collected" })
		res.render("./donars_cloth_nav/pre_navbar", { title: "Previous Donations", previousDonations });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.donar_dash = async (req,res)=>{
    const donorId = req.params.id;
    const numPendingDonations = await Clothes.countDocuments({ donor: donorId, status: "pending" });
	const numAcceptedDonations = await Clothes.countDocuments({ donor: donorId, status: "accepted" });
	const numAssignedDonations = await Clothes.countDocuments({ donor: donorId, status: "assigned" });
	const numCollectedDonations = await Clothes.countDocuments({ donor: donorId, status: "collected" });
    return res.render("./donars_cloth_nav/dash_navbar",{numPendingDonations,numAcceptedDonations, numAssignedDonations, numCollectedDonations})
}

exports.donar_donate = async (req,res)=>{
    return res.render("./donars_cloth_nav/donate_nav")
}

exports.post_donate = async (req,res)=>{
    const data = {
        clothtype:req.body.clothtype,
        quantity:req.body.quantity,
        quality:req.body.quality,
        address:req.body.address,
        mobile:req.body.mobile,
    };
    data.status="pending";
    Clothes.create(data)
        .then((data)=>{
            return res.redirect("/clothpending")
        })
        .catch((err)=>{
            console.log(err);
        })
}

exports.donar_pending = async (req,res)=>{
	try
	{
		const pendingDonations = await Clothes.find({ donor: req.params.id, status:  ["pending", "rejected", "accepted", "assigned"] });
		res.render("./donars_cloth_nav/pending_nav", { title: "Pending Donations", pendingDonations });
	}
	catch(err)
	{
		console.log(err);
		res.redirect("back");
	}
    
}
exports.donar_profile = async (req,res)=>{
    return res.render("./donars_cloth_nav/profile_nav")
}
exports.edit_donor = async (req,res)=>{
    return res.render("./donars_cloth_nav/edit_nav")
}
exports.update_donor = async (req,res)=>{
    try
	{
		const id = req.user._id;
		const updateObj = req.body.donor;	// updateObj: {firstName, lastName, gender, address, phone}
		await User.findByIdAndUpdate(id, updateObj);
		
		req.flash("success", "Profile updated successfully");
		res.redirect("/editdonors");
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}