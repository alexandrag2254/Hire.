// dock controller
appointments.controller('dockController', function($rootScope, $rootScope,$scope, $http, $routeParams, $location, dockFactory, ProfileFactory, CalendarFactory){
		
	if($rootScope.id == null){
		$location.path('/login');
		return false;
	}

	user_id = $rootScope.id;
	$('#footer').hide();

	//get messages automatically 
	dockFactory.getMessages(user_id, function(messages){
		// console.log('back in controller', messages)
		$scope.messages = messages;
	});

//start gathering data
	dockFactory.getEvents( user_id, function(data){
		events = [];
		data = data.vacations;
		// console.log('events', data);
		//clean vacation data

		for(var i=0; i<data.length; i++){

			//make it a background not an event
			if(data[i].rendering == "background"){

				//make it a full day
				// console.log("hello", data[i].start.slice(10, 19));

				if( data[i].start.slice(10,23) == 'T00:00:00.000Z' || data[i].start.slice(10,22) == 'T00:00:00.000' || data[i].start.slice(10,19) == 'T00:00:00') {
					
				e = { 
					id: data[i].title,
					start: data[i].start.slice(0, 10),
					end: data[i].start.slice(0, 10),
					rendering: "background",
					color: '#ff9f89'
				};

				events.push(e);


				}
				//background but not all day
				 else {
				 	e = { 

					id: data[i].title,
					start: data[i].start.slice(0, 19),
					end: data[i].start.slice(0, 19),
					rendering: "background",
					color: '#ff9f89'
				}

				events.push(e);


				 }

			} 

			//not vacation
			else{

				e = {
					title: data[i].title,
					start: data[i].start.slice(0, 19),
					end: data[i].end.slice(0, 19),
				}
				events.push(e);

			}

		}




		CalendarFactory.getAppointments( user_id, function(appnts){

			// console.log("appt", appnts)
			//clean appnt data
			for(var i=0; i<appnts.length; i++){

				start = appnts[i].start_date.slice(0,11) + appnts[i].start_time.slice(11, 19);
				end = (parseInt(appnts[i].start_time.slice(11,2)) + appnts[i].hours).toString();

				e = {
					title: appnts[i].reason,
					start: start,
					end: end
				}

				events.push(e);

			}

			CalendarFactory.getServices(user_id, function(services){

				// console.log('services', services);
				//clean services data
				for(var i=0; i<services.length; i++){

					start = services[i].start_date.slice(0,11) + services[i].start_time.slice(11, 19);
					end = (parseInt(services[i].start_time.slice(11,2)) + services[i].hours).toString();

					e = {
						title: services[i].reason,
						start: start,
						end: end
					}

					events.push(e);
			
				}


				// console.log("full events array", events);


	//-------------calendar=========================================================


		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},

			selectable: true,
			selectHelper: true,
			businessHours: true,

			select: function(start, end) {
				var type = prompt('event type (vacation/event)');
				var title = prompt('Event Title:');
				var eventData;

				if(type=="vacation" || type=="Vacation"){
					if (title) {
						eventData = {
							title: title,
							start: start,
							end: end,
							rendering: 'background',
							color: '#ff9f89'
						};
						$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true


						eventData.user_id = user_id;
						eventData.rendering = 'background';

						//add event or vacation to database 
						dockFactory.addEvent(eventData, function(data){
							//update calendar 
							dockFactory.getEvents( user_id, function(data){
								events = data.vacations;
								// console.log('events', events)


							})
						});

					}
				}

				else if(type== "event" || type=="other" || type=="Event"){
					if (title) {
						eventData = {
							title: title,
							start: start,
							end: end
						};
						$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true


						eventData.user_id = user_id;

						//add event or vacation to database 
						dockFactory.addEvent(eventData, function(data){
							//update calendar 
							dockFactory.getEvents( user_id, function(data){
								events = data.vacations;
								// console.log('events', events)


							})
						});

					}


				}
				else{
					return;
				}

				// $('#calendar').fullCalendar('unselect');


			},


			// businessHours: true, // display business hours
			editable: true,
			eventLimit: true, // allow "more" link when too many events

			events: events,

			eventClick: function(calEvent, jsEvent, view) {
				start = calEvent.start._d.toString()
				end = calEvent.end._d.toString();
				alert('Event: ' +calEvent.title+ " " +start.slice(4,10) + " - " + end.slice(4,10));
			}


			});



				// =============================================================



			})

		})
		
	})


//===================END Of CALENDAR ====================================================================


	//------------ TASK PORTION --------------------------------

	// $scope.tasklist = []; //Array to hold all the tasks 

	// console.log($rootScope.tasklist);

	$scope.addTask = function() {

		if($scope.tasklist == undefined){
			$scope.tasklist = [];
		}

	    if(event.keyCode == 13 && $scope.taskName) {

	        $scope.tasklist.push({"name": $scope.taskName, "completed": false});  
	        $scope.taskName = "";

	    }
	    $rootScope.tasklist = $scope.tasklist;

	}

	
    /*Invoked when a task is crossed out will add to database and save in history*/
    $scope.deleteTask = function(index) {

    	task = {};
    	task.task = $scope.tasklist[index].name;

    	task.user_id = user_id; //no longer hardcoded
    	console.log(task);

    	dockFactory.deleteTask(task, function(data){
			//back from database
			$scope.tasklist.splice(index, 1); //after the end of the day
		});
	}

	//------------ TASK END --------------------------------



});