
// history controller
appointments.controller('historyController', function($rootScope, $rootScope,$scope, $http, $routeParams, $location, HistoryFactory, ProfileFactory){
	
	if($rootScope.id == null){
		$location.path('/login');
		return false;
	}

	$('#footer').hide();
	// $rootScope.users._id = "55bba511ed8e6e9c6c488a84"
	user_id = $rootScope.id;
	// user_id = "55bbabb7d38f326173d2afbd";

    HistoryFactory.getTasks( user_id, function(data){
		$scope.tasks = data;
	});

	ProfileFactory.getAppointments( user_id, function(data){
		// console.log(data)
		$scope.appointments = data;
	});

	ProfileFactory.getServices(user_id, function(data){
		// console.log(data)
		$scope.services = data;
	});

	//--------------------------------------------

	$scope.deleteService = function(id) {

	}
	
    $scope.deleteAppointment = function(id) {

  //   	dockFactory.deleteTask(task, function(data){
		// 	//back from database
		// 	$scope.tasklist.splice(index, 1); //after the end of the day
		// });
	}

	//--------------------------------------------


});