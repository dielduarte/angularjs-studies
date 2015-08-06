(function(){
	'use strict';

	angular.module('notesApp', [])
		.controller('listCtrl', listCtrl);

		listCtrl.$inject = ['$location'];

		function listCtrl($location) {
			var self = this;

			self.items = [
				{ id: 1, lavel: 'first', done: true },
				{ id: 2, lavel: 'second', done: false }
			];

			self.getDoneClass = function(item){
				return {
					finished: item.done,
					unfinished: !item.done
				};
			};

			self.countList = function(item){
				return Object.keys(item).length;
			};

			self.navigate = function(){
				$location.path('/some/where/else');
			}
		}
})();