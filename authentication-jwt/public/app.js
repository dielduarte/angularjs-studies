(function(){
	'use strict';

	angular
		.module('app', [])
		.config(config)
		.constant('API_URL', 'http://localhost:3000')
		.controller('MainCtrl', MainCtrl)
		.factory('RandomUserFactory', RandomUserFactory)
		.factory('UserFactory', UserFactory)
		.factory('AuthTokenFactory', AuthTokenFactory)
		.factory('AuthInterceptor', AuthInterceptor);

		MainCtrl.$inject = ['RandomUserFactory', 'UserFactory'];
		RandomUserFactory.$inject = ['$http', 'API_URL'];
		UserFactory.$inject = ['$http', 'API_URL', 'AuthTokenFactory'];
		AuthTokenFactory.$inject = ['$window'];
		AuthInterceptor.$inject = ['AuthTokenFactory'];
		config.$inject = ['$httpProvider'];

		function MainCtrl(RandomUserFactory, UserFactory) {
			var vm = this;

			vm.getRandomUser = getRandomUser;
			vm.login = login;
			vm.logout = logout;

			function getRandomUser() {
				RandomUserFactory.getUser().then(function success(response){
					vm.randomUser = response.data;
				}, handleError);
			}

			function login(username, password) {
				UserFactory.login(username, password).then(function success(response){
					vm.user = response.data.user;
				}, handleError);
			}

			function logout(){
				UserFactory.logout();
				vm.user = null;
			}

			function handleError(response) {
				alert('ERROR:' +  response.data);
			}

		};

		function RandomUserFactory($http, API_URL){
			return {
				getUser: getUser
			};

			function getUser(){
				return $http.get(API_URL + '/random-user');
			}
		};

		function UserFactory($http, API_URL, AuthTokenFactory){
			return {
				login: login,
				logout: logout
			};

			function login(username, password){
				return $http.post(API_URL + '/login',{
					username: username,
					password: password
				}).then(function success(response){
					AuthTokenFactory.setToken(response.data.token);
					return response;
				});
			}

			function logout() {
				AuthTokenFactory.setToken();
			}
		};

		function AuthTokenFactory($window){
			var store = $window.localStorage;
			var key = 'auth-token';

			return {
				getToken: getToken,
				setToken: setToken
			};

			function getToken(username, password){
				return store.getItem(key);
			}

			function setToken(token){
				if(token)
					store.setItem(key, token);
				else
					store.removeItem(key);
			}
		};

		function AuthInterceptor(AuthTokenFactory){

			return {
				request: addToken
			};

			function addToken(config){
				var token = AuthTokenFactory.getToken();
				if(token) {
					config.headers = config.headers || {};
					config.headers.Authorization = 'Bearer ' + token;
				}
				return config;
			}
		};

		function config($httpProvider){
			$httpProvider.interceptors.push('AuthInterceptor');
		};
})();