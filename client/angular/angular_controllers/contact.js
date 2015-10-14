//contact controller
appointments.controller('contactController', function( $rootScope, $scope, $http, $routeParams, $location, ProfileFactory, ContactFactory){
	
	if($rootScope.id == null){
		$location.path('/login');
		return false;
	}

	user_id = $rootScope.id;

 	ContactFactory.getContactList( user_id, function(data){
		$scope.contact_list = data[0].contact_list;
	});

    
	$scope.addContact = function() {
		console.log($scope.contact);
		contact = $scope.contact;

		if(contact == {} || contact == undefined || contact.name == "" || contact.email == ""){
			$scope.errors_contact = "Please input valid contact";
			return false;
		}
		else {

			// check to see if they are a member of the site 
		 	ContactFactory.check_contact( contact, function(data){
		 		// console.log("check contact this is my data", data);

				//if does not exist
				if (data.length == 0) {
		 			$scope.errors_contact = "User does not exist";
		 			return false;
			 	}

			 	else {

			 		$scope.errors_contact = "";
					contact.user_id = user_id;
					ContactFactory.addContact(contact, function(data){
						// update contact list
						ContactFactory.getContactList( user_id, function(data){
							// console.log("at the very end", data);
							$scope.contact_list = data[0].contact_list;
						});
					})
					
					$scope.contact = {};

			 	}


			});
		}
	};


	$scope.makeAppointment = function(name) {
		console.log(name);

	 	ContactFactory.getId( name, function(data){
	 		// console.log(data);
	 		id = data[0]._id;
	 		$location.path('/calendar/'+id);
		});
	};

	$scope.sendMessage = function(contact, message){
		name = message.name 
		message = contact.message
		// console.log($rootScope);

	 	ContactFactory.getId( name, function(data){
	 		// console.log(data);
	 		id = data[0]._id;

	 		//create message 

	 		new_message = {
	 			from: $rootScope.username,
	 			message: message,
	 			id: id
	 		};

	 		// console.log(new_message);

	 		ContactFactory.addMessage(new_message, function(data){

	 			// console.log('back in controller', data);

	 			if(data == "sent"){
	 				alert('Message Successfully Sent!');
	 			}
	 		})
	 		

		});
	};


	


});