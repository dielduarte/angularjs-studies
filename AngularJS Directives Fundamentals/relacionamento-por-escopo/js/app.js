(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('userInfoCard', userInfoCard);

		function MainController($scope){
			var vm = this;
			vm.oi = 'oii';

			vm.user = {
				name: 'diel duarte',
				address: {
					city: 'betim',
					phone: '31 92263265'
				},
				friends: [
					'pedro',
					'marcio',
					'claudio'
				]
			}

			vm.user1 = {
				name: 'diel user 1',
				address: {
					city: 'betim',
					phone: '31 92263265'
				},
				friends: [
					'pedro',
					'marcio',
					'claudio'
				]
			}

		}


		function userInfoCard(){
			return {
				templateUrl: "userInfoCard.html",
				restrict: 'E',
				scope: {
					user: '='
				},
				controller: function($scope){			
					$scope.knightMe = function(user) {
						user.rank = 'knight';
					}
				}
			}
		}
})();