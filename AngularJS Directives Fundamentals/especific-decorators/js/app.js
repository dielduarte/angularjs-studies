(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('userTile', userTile)
		.directive('userClickSelect', userClickSelect);

		function MainController($scope){
			var vm = this;
			$scope.user1 = {
				name: 'Diel',
				selected: false
			}

		}

		function userTile(){
			return {
				restrict: 'E',
				scope: {
					user: '='
				},
				templateUrl: 'userTile.html'
			}
		}


		function userClickSelect() {
			return {
				link: function(scope, el, attrs) {
					el.on('click', function(){	
						scope.user.selected = !scope.user.selected;
						scope.$apply();
					});
				}
			}
		}


	

})();