//Login/customer controller
appointments.controller('welcomeController', function($rootScope,$scope, $location){

	$('#footer').show();

	console.log('hello')

	$scope.Login = function(){
		//redirect to the login page
		$location.path('/login');
	}

});