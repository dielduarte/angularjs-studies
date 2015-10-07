(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('myRepeat', myRepeat);

		function MainController($scope){
			var vm = this;

			$scope.bountyHunters = [
				{ name: 'diel' },
				{ name: 'diel-1' },
				{ name: 'diel-2' },
				{ name: 'diel-3' },
				{ name: 'diel-4' }
			];

			$scope.add = function(){
				$scope.bountyHunters.push({name: 'novo hunter'});
			}

			$scope.remove = function() {
				$scope.bountyHunters.length--;
			}
		}


		function myRepeat(){
			return {
				retrict: 'A',
				transclude: 'element',
				link: function(scope, el, attrs, ctrl, transclude) {
					var pieces = attrs.myRepeat.split(' ');
					var itemString = pieces[0];
					var collectionName = pieces[2];
					var elements = [];

					scope.$watchCollection(collectionName, function(collection) {
						if(elements.length > 0) {
							for(var i = 0; i < elements.length; i++) {
								elements[i].el.remove();
								elements[i].scope.$destroy();
							}
							
							elements = [];
						}

						for (var i = 0; i < collection.length; i++) {
							var childScope = scope.$new();
							childScope[itemString] = collection[i];
							transclude(childScope, function(clone){
								el.before(clone);
								var item = {};
								item.el = clone;
								item.scope = childScope;
								elements.push(item);
							});
						};
					});
				}
			}
		}


})();