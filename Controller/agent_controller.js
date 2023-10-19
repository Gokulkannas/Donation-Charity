const Donation = require("../models/donation")
const mongoose = require("mongoose");
const User = require("../models/user.js");

exports.agent_previous = async (req,res)=>{
    try
	{
		const previousCollections = await Donation.find({ agent: req.params.id, status: "collected" }).populate("donor");
		res.render("./agent_nav/pre_navbar", { title: "Previous Collections", previousCollections });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.agent_dash = async (req,res)=>{
    const agentId = req.params.id;
	const numAssignedDonations = await Donation.countDocuments({ agent: agentId, status: "assigned" });
	const numCollectedDonations = await Donation.countDocuments({ agent: agentId, status: "collected" });
	res.render("./agent_nav/dash_navbar", {
		title: "Dashboard",
		numAssignedDonations, numCollectedDonations
	});
}

exports.agent_pending = async (req,res)=>{
    try
	{
		const pendingCollections = await Donation.find({ agent: req.params.id, status: "assigned" }).populate("donor");
		res.render("./agent_nav/pending_nav", { title: "Pending Collections", pendingCollections });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}
 
exports.view_collect = async (req,res)=>{
    try
	{
		const collectionId = req.params.collectionId;
		const collection = await Donation.findById(collectionId).populate("donor");;
		res.render("./agent_nav/view_collect_nav", { collection });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.assigning_transport = async(req,res)=>{
	try
	{
		const collectionId = req.params.collectionId;
		const driver = await User.find({ role: "driver" });
		const collection = await Donation.findById(collectionId).populate("donor");
		res.render("./agent_nav/assigning_transport", { title: "Assign agent", collection, driver });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}}

exports.post_assigning_agent =async(req,res)=>{
	try
	{
		const collectionId = req.params.collectionId;
		// const data = {
		// 	adminToAgentMsg:req.body.adminToAgentMsg,
		// 	drop:req.body.drop
		// };
		const {agent, adminToAgentMsg,drop} = req.body;
		await Donation.findByIdAndUpdate(collectionId, { status: "assigned", agent, adminToAgentMsg,drop});
		req.flash("success", "Agent assigned successfully");
		res.redirect(`/viewcollect/${collectionId}`);
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}


exports.collect = async (req,res)=>{
	try
	{
		const collectionId = req.params.collectionId;
		await Donation.findByIdAndUpdate(collectionId, { status: "collected", collectionTime: Date.now() });
		req.flash("success", "Donation collected successfully");
		res.redirect(`/viewcollect/${collectionId}`);
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.agent_profile = async (req,res)=>{
    return res.render("./agent_nav/profile_nav")
}
exports.edit_agent = async (req,res)=>{
    return res.render("./agent_nav/edit_nav")
}