(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('myQuestion', myQuestion);

		function MainController($scope){
			var vm = this;

		}


		function myQuestion(){
			return {
				retrict: 'E',
				transclude: true,
				templateUrl: 'myQuestion.html',
				scope: {
					questionText: '@q'
				}
			}
		}

})();