const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({

	agent:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
        required:true
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
    pickup_address:{
        type:String,
        required:true
    },
    drop_address:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    status:{
		type: String,
		enum: ["pending", "rejected", "accepted", "assigned", "collected"],
		required: true
	},
	agentToDriverMsg: String,
    collectionTime: {
		type: Date,
        default: Date.now(),
	},
    assignedTime:{
        type:Date,
        default: Date.now()
    }
})

const Transport = mongoose.model("transport",transportSchema)

module.exports = transport;