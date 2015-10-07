(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('simpleDirective', simpleDirective);

		function MainController($scope){
			var vm = this;
		}


		function simpleDirective(){
			return {
				compile: function(el, attrs){
					return function(scope, el, attrs, ctrl, transclude) {
						
					}
				}
			}
		}


})();