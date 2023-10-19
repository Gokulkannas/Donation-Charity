const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    donor:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true
	},
	agent:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
    foodtype:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    cookingtime:{
        type:Date,
        default: Date.now(),
    },
    address:{
        type:String,
        required:true
    },
    // drop:{
    //     type:String,
    //     required:true
    // },
    mobile:{
        type:Number,
        required:true
    },
    status:{
		type: String,
		enum: ["pending", "rejected", "accepted", "assigned", "collected"],
		required: true
	},
    donorToAdminMsg: String,
    adminToAgentMsg: String,
	// adminToAgentMsg: {
    //     type:String,
    //     default:"Deliver"
    // },
    collectionTime: {
		type: Date,
        default: Date.now(),
	},
    assignedTime:{
        type:Date,
        default: Date.now()+ 12 * 60 * 60 * 1000,
    }
})

const Donation = mongoose.model("donation",donationSchema)

module.exports = Donation;