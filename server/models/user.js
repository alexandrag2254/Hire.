var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//only one schema for questions with associated answers to these questions
var UserSchema = new mongoose.Schema({
	address: String,
	username: String,
	email: String,
	number: Number,
	details: String,
	password: String,
	signup_time: {type: Date, default: Date.now},
	// hidden: Boolean,
	appointments: [{ //hiring someone else
		contractor: String, //pulled from scope database
		start_date: String,
		start_time: String,
		hours: Number,
		reason: String,
		payment: String,
		directions: String,
		created_at: { type: Date, default: Date.now }
	}],

	services: [{ //appointments you are doing for someone else
		username: String, //your name
		start_date: String,
		start_time: String,
		hours: Number,
		reason: String,
		payment: String,
		directions: String,
		created_at: {type: Date, default: Date.now}
	}],

	vacations: [{ //vacations
		title: String,
		start: String,
		end: String,
		rendering: String,
		created_at: {type: Date, default: Date.now}
	}],

	contact_list: [{
		name: String,
		added_date: {type: Date, default: Date.now}
	}],

	messages: [{
		from: String,
		message: String,
		sent_date: {type: Date, default: Date.now}
	}],
	
	resume: [{
		service: String, //categories: cook, gardening, baby-sitting
		details: String
	}],

	tasks: [{
		task: String,
		created_at: { type: Date, default: Date.now }
	}]

});
mongoose.model('User', UserSchema);