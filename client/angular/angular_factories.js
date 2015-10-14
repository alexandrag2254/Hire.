//factories ///////////////////////////////////////////////////////////////////////////////////

//appointment factory
appointments.factory('AppointmentFactory', function($http){
	var factory = {};
	var appointments = [];
	factory.addAppointment = function(appointment, callback){
		// console.log('facotry_in', appointment)
		$http.post('/add_appointment', appointment).success(function(output){
			//then send a message that appointment was added should take back to calendar view and display on list of scheduled appointments
			callback(output);
		})
	};

	factory.getContractor = function(id, callback) {
		$http.get('/get_contractor/'+ id).success(function(output){
			callback(output);
		})
	};

	return factory;
});

//Welcome FAcotry
appointments.factory('WelcomeFactory', function($http){
	var factory = {};

	factory.check_login = function(info, callback){
		// console.log(info);
		$http.post('/check_login', info).success(function(output){
			callback(output);
		})

	}

	factory.new_user = function(info, callback){
		// console.log(info);

		$http.post('/new_user', info).success(function(output){
			name = info.username;
			// console.log(name)
			$http.get('/get_user_by_name/'+ name).success(function(output){
				// console.log('name', output);
				callback(output);
			})
		})

	}
	

	return factory;
});


//User Dock factory
appointments.factory('dockFactory', function($http){
	var factory = {};

	factory.deleteTask = function(task, callback){
		// console.log(task);

		$http.post('/add_task', task).success(function(output){
			//send task to history
			callback(output);
		})
	};

	factory.getMessages = function(id, callback){
	$http.get('/get_messages/'+ id).success(function(output){
		messages = output[0].messages;
		// console.log(appointments);
		callback(messages);
		});
	};

	factory.addEvent = function(event, callback){
		// console.log(event);

		$http.post('/add_event', event).success(function(output){
			callback(output);
		})
	};

	factory.getEvents = function(id, callback){
		// console.log(id);

		$http.get('/get_events/'+id).success(function(output){
			callback(output);
		})
	};

	return factory;
});

//contact factory
appointments.factory('ContactFactory', function($http){
	var factory = {};

	factory.check_contact = function(contact, callback){
		// console.log("factory in", contact);

		$http.post('/check_contact', contact).success(function(output){
			// console.log("factory out", output);
			callback(output);
		})
	};

	factory.getContactList = function(id, callback){
		// console.log(id);

		$http.get('/get_contact_list/'+id).success(function(output){
			// console.log(output);
			callback(output);
		})
	};

	factory.addContact = function(contact, callback){
		// console.log(contact);

		$http.post('/add_contact', contact).success(function(output){
			// console.log(output);
			callback(output);
		})
	};

	factory.addMessage = function(message, callback){
		// console.log(message);

		$http.post('/add_message', message).success(function(output){
			// console.log(output);
			callback(output);
		})
	};

	factory.getId = function(name, callback){
		// console.log(name);

		$http.get('/get_user_by_name/'+ name).success(function(output){
			// console.log(output);
			callback(output);
		})
	};

	return factory;
});


// History factory
appointments.factory('HistoryFactory', function($http){
	var factory = {};
	//if there are errors-- add to message within the object
	// var errors = {message: ''};

	factory.getTasks = function(id, callback){
		$http.get('/get_tasks/'+ id).success(function(output){
			tasks = output[0].tasks;
			// console.log(tasks)
			callback(tasks);
		});
	};

	// factory.Delete = function(appointment, user_id, callback){
 //      var id = appointment._id;
 //      $http.get("/delete_appointment/" + user_id +"/"+ id).success(function(output){
 //      	// console.log("factory", output);
 //        	callback(output);
 //      })
 //    };

	return factory;
});


// Calendar factory
appointments.factory('CalendarFactory', function($http){
	var factory = {};
	//if there are errors-- add to message within the object
	var errors = {message: ''};

	factory.getAppointments = function(id, callback){
	$http.get('/get_appointments/'+ id).success(function(output){

		appointments = output[0].appointments;
		// console.log(appointments);
		callback(appointments);
		});
	};

	factory.getServices = function(id, callback) {
		$http.get('/get_services/'+ id).success(function(output){

			
			services = output[0].services;
			callback(services);
		});
	};

	factory.Delete = function(appointment, user_id, callback){
      var id = appointment._id;
      $http.get("/delete_appointment/" + user_id +"/"+ id).success(function(output){
      	// console.log("factory", output);
        	callback(output);
      })
    };

	return factory;
});

// Profile factory
appointments.factory('ProfileFactory', function($http){
	var factory = {};
	//if there are errors-- add to message within the object
	// var errors = {message: ''};

	factory.getAppointments = function(id, callback){
	$http.get('/get_appointments/'+ id).success(function(output){
		appointments = output[0].appointments;
		// console.log(appointments);
		callback(appointments);
		});
	};

	factory.getServices = function(id, callback) {
		$http.get('/get_services/'+ id).success(function(output){
			services = output[0].services;
			callback(services);
		});
	};

	factory.getReviews = function(id, callback) {
		$http.get('/get_reviews/'+ id).success(function(output){
			// console.log(output);
			reviews = output[0].reviews;
			callback(reviews);
		});
	};

	factory.addService = function(service, callback) {
		$http.post('/add_service', service).success(function(output){
			callback(output);
		})
	};

	factory.getServiceList = function(id, callback) {
		$http.get('/get_servicelist/'+ id).success(function(output){
			service_list = output[0].resume;
			callback(service_list);
		});
	};

	factory.getUsers = function(id, callback) {
		$http.get('/get_users/'+ id).success(function(output){
			users = output[0];
			callback(users);
		});
	}

	return factory;
});

//Search Factory
appointments.factory('SearchFactory', function($http){
	var factory = {};

	factory.getGlobalServices = function(callback) {
		$http.get('/get_globalServices').success(function(output){
			callback(output);
		});
	};

	//seraching users based on service they can provide
	factory.searchUsers = function(service, callback){
		// console.log(service);
		$http.get('/search_users/'+ service).success(function(output){
			//this should be all users
			callback(output);
		})
	}
	return factory;
});

//Review factory
appointments.factory('ReviewFactory', function($http){
	var factory = {};
	var reviews = [];
	factory.addReview = function(review, callback){
		// console.log(review);
		$http.post('/add_review', review).success(function(output){
			callback(output);
		})
	};
	return factory;
});
