//Appointment controller
appointments.controller('Review', function($rootScope, $scope, $routeParams, $location, ReviewFactory){

	if($rootScope.id == null){
		$location.path('/login');
		return false;
	}

	$('#footer').hide();

	id = $routeParams.id; //for which user
	user_id = $rootScope.id;

	$scope.addReview = function(){
		// console.log($scope.review);
		review = $scope.review;
		review._id = id;
		//-------------------------------------------//
		ReviewFactory.addReview(review, function(data){
				$location.path('/user_dock')
			// $location.path("/user_dock/" +user_id);
		});
	};
});
