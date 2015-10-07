(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('dad', dad)
		.directive('son', son);

		function MainController($scope){
			var vm = this;
		}


		function dad(){
			var name = 'diel';
			return {
				scope: true,
				controller: function($scope){
					this.name = name;
				},
				link: function(scope, el, attrs){
						el.data('name', name);
				}
			}
		}

		function son(){
			return {
				scope: true,
				require: '^dad',
				link:function(scope, el, attrs, dadController){
						el.data('name', 'son');
						console.log('my dad is ' + dadController.name);
				}
			}
		}



})();