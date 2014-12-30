'use strict';

var scrollable, $div;

jasmine.getFixtures().fixturesPath = '/base/tests/fixtures/';
jasmine.getStyleFixtures().fixturesPath = '/base/tests/fixtures/';

function setUpScrollable(options) {
	$div = $('.container');
	scrollable = new pintxos.ScrollableNative($div[0], options);
	scrollable.init();
}

beforeEach(function () {

	loadStyleFixtures('style.css');
});

describe('general', function () {

	sharedTests('horizontal');
	sharedTests('vertical');


});


function sharedTests (orientation) {

	loadFixtures(orientation + '.html');



	it('should work', function () {
		expect(true).toBe(true);
	})
}




describe('horizontal scrolling', function () {

	beforeEach(function () {

		loadFixtures('horizontal.html');

		setUpScrollable({
			orientation: 'horizontal'
		});
	});

	afterEach(function () {
		scrollable.destroy();
	});

	it("should set scrollLeft", function () {

		var pos;

		pos = 10;

		scrollable.setScrollPos(pos);

		expect($div.scrollLeft()).toBe(pos);
		expect(scrollable.getScrollPos()).toBe(pos);
	});

	it("should get the maskwidth correct", function () {

		expect(scrollable.getMaskSize()).toBe($div.width());
	});

	it("should return the right maximum scroll position", function () {

		var maxScrollPos;

		maxScrollPos = $div[0].scrollWidth - $div.width();
		expect(maxScrollPos).toBe(scrollable.getMaxScrollPos());
	});



	it('should returns the right properties', function () {
		expect(scrollable._getProp('scrollPos')).toBe('scrollLeft');
		expect(scrollable._getProp('scrollSize')).toBe('scrollWidth');
		expect(scrollable._getProp('size')).toBe('width');
		expect(scrollable._getProp('offset')).toBe('left');
	});
});

describe('vertical scrolling', function () {

	beforeEach(function () {

		loadFixtures('vertical.html');

		setUpScrollable({
			orientation: 'vertical'
		});
	});

	it("should set scrollTop", function () {

		var pos;

		pos = 10;

		$div.scrollTop(10);
		expect($div.scrollTop()).toBe(pos);
	});

	it("should get the mask height correct", function () {

		expect(scrollable.getMaskSize()).toBe($div.height());
	});

	it("should return the right maximum scroll position", function () {

		var maxScrollPos;

		maxScrollPos = $div[0].scrollHeight - $div.height();
		expect(maxScrollPos).toBe(scrollable.getMaxScrollPos());
	});

	it('should returns the right properties', function () {
		expect(scrollable._getProp('scrollPos')).toBe('scrollTop');
		expect(scrollable._getProp('scrollSize')).toBe('scrollHeight');
		expect(scrollable._getProp('size')).toBe('height');
		expect(scrollable._getProp('offset')).toBe('top');
	});

});

