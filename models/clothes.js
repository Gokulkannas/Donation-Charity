const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema({
    donor:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true
	},
	agent:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
    clothtype:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    quality:{
        type:String,
        required:true
    },
    address:{
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
    donorToAdminMsg: String,
    collectionTime: {
		type: Date,
        default: Date.now(),
	},
    assignedTime:{
        type:Date,
        default: Date.now()
    }
})

const Clothes = mongoose.model("Clothes",clothesSchema)

module.exports = Clothes;