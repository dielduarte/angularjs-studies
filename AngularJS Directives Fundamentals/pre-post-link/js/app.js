(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('dad', dad)
		.directive('dadPost', dadPost)
		.directive('son', son)
		.directive('sonPost', sonPost);

		function MainController($scope){
			var vm = this;
		}


		function dad(){
			return {
				scope: true,
				link: {
					pre: function(scope, el, attrs){
						el.data('name', 'dad');
						scope.master = 'diel';
					}
				}
			}
		}

		function son(){
			return {
				scope: true,
				link: {
					pre: function(scope, el, attrs){
						el.data('name', 'son');
						console.log('my master is ' + scope.master);
					}
				}
			}
		}

		function dadPost(){
			return {
				scope: true,
				link: {
					post: function(scope, el, attrs){
						el.data('name', 'dad');
						scope.master = 'diel';
					}
				}
			}
		}

		function sonPost(){
			return {
				scope: true,
				link: {
					post: function(scope, el, attrs){
						el.data('name', 'son');
						//o resultado sera indefinido pois quando usamos post
						//le-se do filho para o pai
						//esta e a directiva filha entao a variavel scope.master ainda nao foi definida 
						console.log('my master is ' + scope.master);
					}
				}
			}
		}

})();