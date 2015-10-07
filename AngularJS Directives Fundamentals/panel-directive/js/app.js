(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('swTabstrip', swTabstrip)
		.directive('swPane', swPane);

		function MainController($scope){
			var vm = this;
		}


		function swTabstrip(){
			return {
				restrict: 'E',
				transclude: true,
				scope: {},
				controller: function($scope){
					$scope.panes = [];

					$scope.select = function(pane){
						pane.selected = true;
						$scope.panes.forEach(function(curPane){
							if(curPane != pane)
								curPane.selected = false;
						});
					}

					this.addPane = function(pane){
						$scope.panes.push(pane);

						if($scope.panes.length === 1)
							pane.selected = true;
					}
				},
				templateUrl: 'swTabstrip.html'
			}
		}

		function swPane(){
			return {
				restrict: 'E',
				transclude: true,
				scope: {
					title: '@'		
				},
				require: '^swTabstrip',
				link: function(scope, el, attrs, swTabstripController){
					swTabstripController.addPane(scope);
				},
				templateUrl: 'swPane.html'
			}
		}



})();