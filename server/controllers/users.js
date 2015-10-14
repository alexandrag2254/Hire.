var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
return{
	//getting appointment to specific question
	get_appointments: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},

	get_messages: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},

	check_login: function(req, res){
		// console.log(req);
		User.find({ username : req.username_login }, function(err, results){
			// console.log(results);
			if(results == [] || results == null || results == undefined){
				res.json("User does not exist");
			} else if(err){
				res.send(err);
			} else{
				var user;
				for(var i = 0; i <results.length; i++){
					if(req.password_login == results[i].password){
						user = results[i];
						res.json(user);
					}
				}
				res.json('Incorrect Information');
				}
			});
	},

	check_contact: function(req, res){
		// console.log(req);

		User.find({ email : req.email }, function(err, results){
			// console.log(results);
			if(results == [] || results == null || results == undefined){
				res.json("User does not exist");
			} else if(err){
				res.send(err);
			} else{
				res.json(results);
				}
			});
	},

	add_contact: function(req, res){
		var query = { _id :  req.user_id };
		var add_contact = {
			name: req.name,
			email: req.email
		};
		User.update(query, { $addToSet : { contact_list : add_contact }}, function(err, status){
			if(err){
				res.send(err);
			} else {
				res.json(status);
			}
		});
	},

	add_message: function(req, res){
		var query = { _id :  req.id };
		var add_message = {
			from: req.from,
			message: req.message,
		};
		User.update(query, { $addToSet : { messages : add_message }}, function(err, status){
			if(err){
				res.send("error");
			} else {
				res.json("sent");
			}
		});
	},

	add_vacation: function(req, res){
		// console.log(req);
		// console.log(req.user_id);
		// console.log(req.start.slice(0,-1));
		start = req.start.slice(0,-1);
		end = req.end.slice(0,-1);
		var query = { _id :  req.user_id };

		if(req.rendering){
			var add_vacation = {
				title: req.title,
				start: start,
				rendering: 'background',
				color: '#ff9f89',
				end: end
			};
		}
		else{
			var add_vacation = {
				title: req.title,
				start: start,
				end: end
			};
		}
		
		// console.log(add_vacation);

		User.update(query, { $addToSet : { vacations : add_vacation }}, function(err, status){	
			if(err){
				// console.log(err);
				res.send(err);
			} else {
				// console.log(status)
				res.json(status);
			}
		});
	},

	new_user: function(req, res){
		User.update(req, function(err, status){
			// console.log(status);
			if(err){
				res.send(err);
			} else {
				res.json(status);
			}
		});
	},

	get_user_by_name: function(req, res){
		// console.log("hello", req)
		User.find({ username : req.name }, function(err, results){
			// console.log(results);
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	get_id: function(req, res){
		// console.log("hello", req)
		User.find({ username : req }, function(err, results){
			// console.log(results);
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	get_tasks: function(req, res){
		// console.log("hello", req.params.id)
		User.find({ _id : req.params.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},

	get_reviews: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},

	get_services: function(req, res){
		User.find({ _id : req.params.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results);
			}
		});
	},

	get_vacations: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				// console.log(results);
				res.json(results[0]);
			}
		});
	},

	get_servicelist: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	get_contact_list: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	//for searching services drop down menu
	get_globalServices: function(req, res){
		User.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				res.json(results);
			}
		})
	},

	add_appointment: function(req, res){
		// console.log(req,"controller");
		//this should be the id for the user/customer
		var query = { username:req.username };
		var new_appointment = {
			contractor: req.contractor,
			start_date: req.start_date,
			start_time: req.start_time,
			hours: req.hours,
			reason: req.reason,
			payment: req.payment,
			directions: req.directions,
			created_at: new Date()
		}
		
		// console.log(new_appointment);
		User.update(query, { $addToSet : { appointments : new_appointment }}, function(err, status){
			if(err){
				res.send(err);
			}
			else{
				var new_service = {
					username: req.contractor,
					start_date: req.start_date,
					start_time: req.start_time,
					hours: req.hours,
					reason: req.reason,
					payment:  req.payment,
					directions: req.directions,
					created_at: new Date()
				}
				User.update({username: req.contractor}, { $addToSet: {services: new_service}}, function(err, status){
					if(err) {
					// console.log("error", err);
					res.send(err);
					} 
					else {
						res.json(status);
					}
				});
			}
		});
	},

	add_service: function(req, res){
		var query = { _id :  req.user_id };
		var add_service = {
			service: req.service,
			details: req.details
		};
		User.update(query, { $addToSet : { resume : add_service }}, function(err, status){
			if(err){
				res.send(err);
			} else {
				res.json(status);
			}
		});
	},

	add_task: function(req, res){
		// console.log(req);
		var query = { _id :  req.user_id };
		var add_task = {
			task: req.task,
		};
		User.update(query, { $addToSet : { tasks : add_task }}, function(err, status){
			if(err){
				res.send(err);
			} else {
				res.json(status);
			}
		});
	},

	add_review: function(req, res){
		// console.log(req);
		var query = { _id :  req._id };
		var add_review = {
			review: req.review,
			rating: req.rating
		};
		// console.log(add_review);
		User.update(query, { $addToSet : { reviews : add_review }}, function(err, status){
			if(err){
				// console.log('error');
				res.send(err);
			} else {
				// console.log('yes');
				res.json(status);
			}
		});
	},

	// //getting specific contractor
	get_contractor: function(req, res){
		User.find({ _id : req.id }, function(err, results){
			if(err){
				res.send(err);
			} else {
				res.json(results);
			}
		});
	},

	search_users: function(req, res){
		//first get all users at once select all resume and filter throught that
		User.find({}, function(err, results){
			if(err){
				res.send(err);
			} else{
				// console.log(results);
				res.json(results);
			}
		})
	},

	delete_appointment: function(req, res){
		// remove appointment from user in appointment array
		User.find({ _id: req.user_id}, function(err, results){
			for(var i=0; i<results[0].appointments.length; i++) {
				if(req.id == results[0].appointments[i]._id) {
					// console.log(req.id);
					results[0].appointments.splice(i, 1)
					var newAppointments = results[0].appointments;
					// console.log("New appointments after deletion", newAppointments);
					User.update({ _id : req.user_id }, {$set: {appointments: newAppointments}}, function(err, results){
						if(err){
							res.send(err);
						} else {
							// remove service from contractors service array
							// User.update({ _id:req.contractor.id}, function(err, results){
								if(err){
									res.send(err);
								} else{
									res.json(results);
								}
							// })
						}
					});
				}
			}
		})
	}
}
})();
