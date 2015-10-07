(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('myLazyRender', myLazyRender)
		.directive('echo', echo);

		function MainController($scope){
			var vm = this;

			vm.numbers = ['1', '2', '3'];
		}


		function myLazyRender(){
			return {
				retrict: 'A',
				transclude: 'element',
				priority: 1200,
				link: function(scope, el, attrs, ctrl, transclude) {
					var hasBeenShow = false;
					var unWatch = scope.$watch(attrs.myLazyRender, function(newvalue){
						if(newvalue && !hasBeenShow) {
							hasBeenShow = true;
							transclude(scope, function(clone){
								el.after(clone);
							});
							unWatch();			
						}
					});
				}
			}
		}

		function echo(){
			return {
				restrict: 'A',
				priority: 900,
				link: function(){
					console.log('my priority is smaller');
				}
			}
		}

})();