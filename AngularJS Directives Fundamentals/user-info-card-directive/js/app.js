(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('userInfoCard', userInfoCard);

		function MainController($scope){
			var vm = this;
			vm.oi = 'oii';

			$scope.user = {
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
		}


		function userInfoCard(){
			return {
				templateUrl: "userInfoCard.html",
				restrict: 'E'
			}
		}
})();