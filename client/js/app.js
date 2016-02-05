//=======================================================
//APP.JS -- discussionBoardModule stores angular app 'myApp'
//=======================================================
var discussionBoardModule = angular.module('myApp', ['ngRoute']);

discussionBoardModule.config(function($routeProvider){
	$routeProvider
	.when('/', {
		title: 'Login and Registration',
		templateUrl: 'partials/login.html'
	})
	.when('/dashboard', {
		title: 'Main Dashboard',
		templateUrl: 'partials/dashboard.html'
	})
	.when('/topic/:id', {
		title: 'Topic',
		templateUrl: 'partials/topic.html'
	})
	.when('/user/:id', {
		title: 'User Profile',
		templateUrl: 'partials/user.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});

discussionBoardModule.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);