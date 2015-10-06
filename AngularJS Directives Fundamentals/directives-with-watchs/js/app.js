(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('fontScale', fontScale);

		function MainController($scope){
			var vm = this;
			$scope.size = 150;

		}

		function fontScale(){
			return {
				link: function(scope, el, attrs){
					scope.$watch(attrs['fontScale'], function(newval){
						el.css('font-size', newval + '%');
					});
				}
			}
		}

	

})();