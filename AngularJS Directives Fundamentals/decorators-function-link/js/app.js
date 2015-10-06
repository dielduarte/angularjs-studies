(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('spacebarSupport', spacebarSupport)
		.directive('eventPause', eventPause);

		function MainController($scope){
			var vm = this;
			vm.oi = 'oii';

			$scope.handlePause = function(){
				console.log('video was paused');
			}
		}


		function spacebarSupport(){
			return {
				retrict: 'A',
				link: function(scope, el, attrs){
					$('body').on('keypress', function(evt){
						var currentVideo = el[0];
						if(evt.keyCode === 32) {
							if(currentVideo.paused)
								currentVideo.play();
							else
								currentVideo.pause();
						}
					});
				}
			}
		}

		function eventPause($parse){
			return {
				retrict: 'A',
				link: function(scope, el, attrs) {
					var fn = $parse(attrs['eventPause']);
					el.on('pause', function(event){
						scope.$apply(function(){
							fn(scope,{evt: event})
						});
					});
				}
			}
		}

})();