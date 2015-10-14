var users_array = [];

//Login/reigster controller
appointments.controller('loginController', function($rootScope, $scope, $location, WelcomeFactory){

	//include a factory here 

	$('#footer').show();

	$scope.Login = function(){

		if($scope.new_friend == undefined || $scope.new_friend.username == "" || $scope.new_friend.username == " " || $scope.new_friend.password == "" || $scope.new_friend.password == " "){
			$scope.errors_login = "Name/Password must be filled";
		}
		else{
			$scope.errors_login = '';
			// console.log($scope.new_friend);
			WelcomeFactory.check_login( $scope.new_friend, function(data){
				if(data == "Incorrect Information"){
					$scope.errors_login = data;
				}
				else{
					$scope.errors_login = '';
					// console.log(data);
					// console.log(data._id)
					$rootScope.id = data._id;
					$rootScope.username = data.username;
					$scope.errors_register = '';
					$location.path('/user_dock');
				}
			});
			
		}
		
	}

	$scope.Register = function(){

		if($scope.new_friend.username == '' || $scope.new_friend.email == undefined || $scope.new_friend.address == undefined || $scope.new_friend.number == undefined || $scope.new_friend.password == undefined || $scope.new_friend.password2 == undefined){
			$scope.errors_register = "Error with Information";
			return false;
		}
		if($scope.new_friend.password !== $scope.new_friend.password2){
			$scope.errors_register = "Passwords do not match";
			return false;
		} 

		else {

			WelcomeFactory.new_user( $scope.new_friend, function(data){
				$rootScope.id = data[0]._id;
				$rootScope.username = data[0].username;
				// console.log($rootScope.id);
				$location.path('/user_dock');
			});
		}


	}


});