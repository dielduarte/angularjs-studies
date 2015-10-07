(function(){

	angular
		.module('app', [])
		.controller('MainController', MainController)
		.directive('userList', userList);

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


		function userList(){
			return {
				retrict: 'A',
				transclude: 'element',
				link: function(scope, el, attrs, ctrl, transclude) {
					var pieces = attrs.userList.split(' ');
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
								var wrapper = angular.element('<div class="well">');
								wrapper.append(clone);
								el.before(wrapper);
								var item = {};
								item.el = wrapper;
								item.scope = childScope;
								elements.push(item);
							});

						};
					});
				}
			}
		}


})();