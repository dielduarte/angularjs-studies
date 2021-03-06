describe('Controller: listCtrl', function(){
	//instanciando o modulo antes de cada it
	beforeEach(module('notesApp'));

	var ctrl, $loc;

	//instancio o controller antes de cada it
	beforeEach(inject(function($controller, $location){
		ctrl = $controller('listCtrl');
		$loc = $location;
	}));

	it('should have items available on load', function(){
		expect(ctrl.items).toEqual([
			{ id: 1, lavel: 'first', done: true },
			{ id: 2, lavel: 'second', done: false }
		]);
	});

	it('should have highlight items based on state', function(){
		var item = { id: 1, lavel: 'first', done: true };
		var actualClass = ctrl.getDoneClass(item);

		expect(actualClass.finished).toBeTruthy();
		expect(actualClass.unfinished).toBeFalsy();

		item.done = false;

		actualClass = ctrl.getDoneClass(item);
		expect(actualClass.finished).toBeFalsy();
		expect(actualClass.unfinished).toBeTruthy();

	});

	it('should return lenght of object', function(){
		var item = [
			{ id: 1, lavel: 'first', done: true },
			{ id: 2, lavel: 'second', done: false },
			{ id: 2, lavel: 'second', done: false }
		];

		var count = ctrl.countList(item); 
		expect(count).toEqual(3);
	});

	it('should navigate away from the current page', function() {
		$loc.path('/here');
		ctrl.navigate();

		expect($loc.path()).toEqual('/some/where/else');
	});

});