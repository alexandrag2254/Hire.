
var appointments = angular.module('appointments',['angularPayments','ngRoute']);

appointments.config(function($routeProvider){

	$routeProvider
	.when('/user_dock',{ templateUrl: 'partials/user_dock.html' })
	.when('/',{ templateUrl: 'partials/welcome.html' })
	.when('/history',{ templateUrl: 'partials/history.html' })
	.when('/contact',{ templateUrl: 'partials/contact.html' })
	// .when('/login',{ templateUrl: 'partials/login.html', resolve: { logincheck: checkLoggedin } })
	.when('/login',{ templateUrl: 'partials/login.html' })
	.when('/your_profile',{ templateUrl: 'partials/your_profile.html' })
	// .when('/register',{ templateUrl: 'partials/register.html' })
	.when('/search', { templateUrl: "partials/search_view.html"})
	.when('/pay', { templateUrl: "partials/pay_page.html"})
	.when('/add_appointment/:id', { templateUrl: "partials/add_appointment.html"})
	.when('/calendar/:id', { templateUrl: "partials/calendar_view.html"})
	.when('/add_review/:id', { templateUrl: "partials/add_review.html"})
	.otherwise( { redirectTo: "/" });
});

// var checkLoggedin = function($q, $location, $rootScope, $http) {
// 	console.log('in logged in ')
// 	var deferred = $q.defer();

// 	$http.get('/loggedin').success(function(user){
// 		console.log('checkLoggedin',user);
// 		if (user) {
// 			console.log('yes loggedin',user);
// 			$rootScope.users = user;
// 			$rootScope.currentUser = user; //$rootScope.currentUser is used ng-show- see index nav
// 			deferred.resolve();
// 			$location.url('/');
// 		}//ends if
// 		else {
// 			console.log('no loggedin');
// 			deferred.reject();
// 			$location.url('/login');
// 		}
// 	})
// };