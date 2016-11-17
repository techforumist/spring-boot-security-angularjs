// Creating angular Application with module name "SecurityTestApp"
var app = angular.module('SecurityTestApp', []);

// If we implement the basic security in spring boot then the response will
// contains the header 'WWW-Authenticate: Basic'. So the browser will popup a
// alert to get the user credentials. To avoid that we have to set a header in
// every request we are making using AngularJs.
app.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
} ]);

// Creating the Angular Controller
app.controller('AppCtrl', function($http, $scope) {
	
	// method for login
	$scope.login = function() {
		// creating base64 encoded String from username and password
		var base64Credential = btoa($scope.username + ':' + $scope.password);
		
		// calling GET request for getting the user details
		$http.get('user', {
			headers : {
				// setting the Authorization Header
				'Authorization' : 'Basic ' + base64Credential
			}
		}).success(function(res) {
			$scope.password = null;
			if (res.authenticated) {
				$scope.message = '';
				// setting the same header value for all request calling from this app
				$http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
				$scope.user = res;
			} else {
				$scope.message = 'Authetication Failed !';
			}
		}).error(function(error) {
			$scope.message = 'Authetication Failed !';
		});
	};
	// method for getting an Administrator Resource
	$scope.getAdminResouce = function() {
		$http.get('/api/admin/resource').success(function(res) {
			$scope.resource = res;
		}).error(function(error) {
			$scope.resource = error;
		});
	};
	// method for getting a User Resource
	$scope.getUserResouce = function() {
		$http.get('/api/user/resource').success(function(res) {
			$scope.resource = res;
		}).error(function(error) {
			$scope.resource = error;
		});
	};
	// method for logout
	$scope.logout = function() {
		// clearing the authorization header
		$http.defaults.headers.common['Authorization'] = null;
		// clearing all data
		$scope.user = null;
		$scope.message = 'Successfully logged out';
		$scope.resource = null;
	};
});