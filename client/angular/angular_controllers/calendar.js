// Calendar controller

appointments.controller('Calendar', function($rootScope,$scope, $routeParams, $location, CalendarFactory, dockFactory, ReviewFactory, AppointmentFactory, ProfileFactory){

	if($rootScope.id == null){
		$location.path('/login');
		return false;
	}

	$('#footer').hide();

	var user_id = $rootScope.id;
	contractor_id = $routeParams.id;

	// CalendarFactory.getAppointments( user_id, function(data){
	// 	$scope.appointments = data;
	// });

	AppointmentFactory.getContractor(contractor_id, function(contractor_data){
		$scope.contractor = contractor_data[0];
		// console.log("brians info", $scope.contractor);
	})

	//display review
	ProfileFactory.getReviews( contractor_id, function(data){
		$scope.contractor_reviews = data;
		// console.log("reviews in controller", $scope.reviews);
	});

	//fill calendar

//need to also get vacations instead of vacations 

	dockFactory.getEvents(contractor_id, function(data){
		$scope.vacations = data.vacations;

		var vacations = [];

		for(var i=0; i< $scope.vacations.length; i++){
			console.log($scope.vacations[i].start)

			vacations.push({
				// id: $scope.vacations[i].title,
				start: $scope.vacations[i].start.slice(0,19),
				end: $scope.vacations[i].end.slice(0,19),
				rendering: 'background',
				color: '#ff9f89'
			});

			vacations.push({
				start: $scope.vacations[i].start.slice(0,10),
				end: $scope.vacations[i].end.slice(0,10),
				rendering: 'background',
				color: '#ff9f89'
			});
		}


		// console.log(vacations);


		//render full calendar
		$('#calendars').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			businessHours: true,

			eventLimit: true, // allow "more" link when too many vacations
			events: vacations
		});



		// });
	});


});