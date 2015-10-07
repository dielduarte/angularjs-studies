(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('myTransclude', myTransclude);

		function MainController($scope){
			var vm = this;

			vm.numbers = ['1', '2', '3'];
		}


		function myTransclude(){
			return {
				retrict: 'A',
				transclude: 'element',
				template: '<div ng-transclude></div>',
				link: function(scope, el, attrs, ctrl, transclude) {
					transclude(scope, function(clone){
						el.after(clone);
					});
				}
			}
		}

})();