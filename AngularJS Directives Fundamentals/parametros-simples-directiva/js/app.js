(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('userInfoCard', userInfoCard)
		.directive('address', address);

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
					user: '=',
					innitialCollapse: '@collapsed'
				},
				controller: function($scope){
					$scope.collapsed = ($scope.innitialCollapse === 'true');			
					$scope.knightMe = function(user) {
						user.rank = 'knight';
					}
					$scope.collapse = function() {
						$scope.collapsed = !$scope.collapsed;
					}
				}
			}
		} //end userInfoCard

		function address(){
			return {
				templateUrl: 'address.html',
				restrict: 'E',
				scope: true,
				controller: function($scope){
					$scope.collapsed = false;
					$scope.collapseAddress = function() { 
							$scope.collapsed = true;
					}
					$scope.expandAddress = function() { 
							$scope.collapsed = false;
					}
				}
			}
		}
})();