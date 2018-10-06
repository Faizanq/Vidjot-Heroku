const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


//Create a model Schema

const UsersSchema = new Schema({

		name:{
			type:String,
			required:true
		},
		email:{
			type:String,
			required:true
		},
		password:{
			type:String,
			required:true
		},
		date:{
			type:Date,
			default:Date.now()
		}
});

mongoose.model('Users',UsersSchema);