const Donation = require("../models/donation")
const User = require("../models/user")
const Clothes = require("../models/clothes")

//Admin
exports.admin_navbar = async (req,res)=>{
	try
	{
		const previousDonations = await Clothes.find({status: "collected" }).populate("donor");
		res.render("./admin_cloth_nav/pre_navbar", { title: "Previous Donations", previousDonations });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.admin_dash = async (req,res)=>{
    
	const numAdmins = await User.countDocuments({ role: "admin" });
	const numDonors = await User.countDocuments({ role: "donor" });
	const numAgents = await User.countDocuments({ role: "agent" });
	const numDriver = await User.countDocuments({ role: "driver" });
	const numPendingDonations = await Clothes.countDocuments({ status: "pending" });
	const numAcceptedDonations = await Clothes.countDocuments({ status: "accepted" });
	const numAssignedDonations = await Clothes.countDocuments({ status: "assigned" });
	const numCollectedDonations = await Clothes.countDocuments({ status: "collected" });
    return res.render("./admin_cloth_nav/dash_navbar",{numAdmins, numDonors, numAgents, numDriver,numPendingDonations, numAcceptedDonations, numAssignedDonations, numCollectedDonations})
}

exports.admin_donate = async (req,res)=>{
	try
	{
		const agents = await User.find({ role: "agent" });
		res.render("./admin_cloth_nav/agent_nav", { title: "List of agents", agents });
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.admin_pending = async (req,res)=>{
    try
	{
		const pendingDonations = await Clothes.find({status: ["pending", "accepted", "assigned"]}).populate("donor");
		res.render("./admin_cloth_nav/pending_nav", { title: "Pending Donations", pendingDonations });
	}
	catch(err)
	{
		console.log(err);
		res.redirect("back");
	}
}

exports.pending_accept = async(req,res)=>{
    try
	{
		const donationId = req.params.donationId;
		const donation = await Clothes.findById(donationId).populate("donor").populate("agent");
		res.render("./admin_cloth_nav/pending_accept", { donation });
	}
	catch(err)
	{
		console.log(err);
	}
}

exports.accept_assign_agent = async(req,res)=>{
    try
	{
		const donationId = req.params.donationId;
		await Clothes.findByIdAndUpdate(donationId, { status: "accepted" });
		res.redirect(`/adminclothpendingaccept/${donationId}`);

	}
	catch(err)
	{
		console.log(err);
	}}

exports.reject = async(req,res)=>{
    try
	{
		const donationId = req.params.donationId;
		await Clothes.findByIdAndUpdate(donationId, { status: "rejected" });
		res.redirect(`/adminclothpendingaccept/${donationId}`);

	}
	catch(err)
	{
		console.log(err);
	}	
} 

exports.assigning_agent = async(req,res)=>{
	try
	{
		const donationId = req.params.donationId;
		const agents = await User.find({ role: "agent" });
		const donation = await Clothes.findById(donationId).populate("donor");
		res.render("./admin_cloth_nav/assigning_nav", { title: "Assign agent", donation, agents });
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
		const donationId = req.params.donationId;
		const { agent, adminToAgentMsg } = req.body;
		await Clothes.findByIdAndUpdate(donationId, { status: "assigned", agent, adminToAgentMsg });
		req.flash("success", "Agent assigned successfully");
		res.redirect(`/adminclothpendingaccept/${donationId}`);
	}
	catch(err)
	{
		console.log(err);
		req.flash("error", "Some error occurred on the server.")
		res.redirect("back");
	}
}

exports.agent_assigned = async(req,res)=>{
	try
	{
		const donationId = req.params.donationId;
		const donation = await Clothes.findByIdAndUpdate(donationId,{status:"assigned"})
		res.redirect(`/adminclothpendingaccept/${donationId}`);
	}
	catch(err)
	{
		console.log(err);
		res.redirect("back");
	}
}


exports.admin_profile = async (req,res)=>{
    return res.render("./admin_cloth_nav/profile_nav")
}
exports.edit_admin = async (req,res)=>{
    return res.render("./admin_cloth_nav/edit_nav")
}
exports.update_admin = async (req,res)=>{
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
