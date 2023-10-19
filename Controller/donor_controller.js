const Donation = require("../models/donation.js")
const User = require("../models/user.js");
const mongoose = require("mongoose");

exports.donar_navbar = async (req,res)=>{
    try
	{
		const previousDonations = await Donation.find({ donor: req.user._id, status: "collected" }).populate("agent");
		res.render("./donars_nav/pre_navbar", { title: "Previous Donations", previousDonations });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.donar_dash = async (req,res)=>{
    const donorId = req.user._id;
    const numPendingDonations = await Donation.countDocuments({ donor: donorId, status: "pending" });
	const numAcceptedDonations = await Donation.countDocuments({ donor: donorId, status: "accepted" });
	const numAssignedDonations = await Donation.countDocuments({ donor: donorId, status: "assigned" });
	const numCollectedDonations = await Donation.countDocuments({ donor: donorId, status: "collected" });
    return res.render("./donars_nav/dash_navbar",{numPendingDonations,numAcceptedDonations, numAssignedDonations, numCollectedDonations})
}

exports.donar_donate = async (req,res)=>{
    return res.render("./donars_nav/donate_nav")
}

exports.post_donate = async (req,res)=>{
    const data = {
        foodtype:req.body.foodtype,
        quantity:req.body.quantity,
        cookingtime:req.body.cookingTime,
        address:req.body.address,
        mobile:req.body.mobile,
        donorToAdminMsg:req.body.donorToAdminMsg,
    };
    data.status="pending";
    data.donor = req.user._id;
    Donation.create(data)
        .then((data)=>{
            return res.redirect("/pending")
        })
        .catch((err)=>{
            console.log(err);
        })
	// try
	// {
	// 	const donation = req.body.donation;
	// 	donation.status ="pending";
	// 	donation.donor = req.user._id;
	// 	const newDonation = new Donation(donation);
	// 	await newDonation.save();
	// 	res.redirect("/pending");
	// }
	// catch(err)
	// {
	// 	console.log(err);
	// 	req.flash("error", "Some error occurred on the server.")
	// 	res.redirect("back");
	// }
}

exports.donar_pending = async (req,res)=>{
    // Donation.find({donor: req.user._id,status: ["pending", "rejected", "accepted", "assigned"]})
    // .then((data)=>{
    //     return res.render("./donars_nav/pending_nav", { data })
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    try
	{
		const pendingDonations = await Donation.find({ donor: req.user._id, status: ["pending", "rejected", "accepted", "assigned"] }).populate("agent");
		res.render("./donars_nav/pending_nav", { title: "Pending Donations", pendingDonations });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}
exports.donar_profile = async (req,res)=>{
    return res.render("./donars_nav/profile_nav")
}
exports.edit_donor = async (req,res)=>{
    return res.render("./donars_nav/edit_nav")
}
exports.update_donor = async (req,res)=>{
    try
	{
		const id = req.user._id;
		const updateObj = req.body.donor;	// updateObj: {firstName, lastName, gender, address, phone}
		await User.findByIdAndUpdate(id, updateObj);
		
		req.flash("success", "Profile updated successfully");
		res.redirect("/donarprofile");
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}