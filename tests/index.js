'use strict';

var scrollable, $div, props;

jasmine.getFixtures().fixturesPath = '/base/tests/fixtures/';
jasmine.getStyleFixtures().fixturesPath = '/base/tests/fixtures/';

props = {
	horizontal: {
		scrollPos: 'scrollLeft',
		scrollSize: 'scrollWidth',
		size: 'width',
		offset: 'left'
	},
	vertical: {
		scrollPos: 'scrollTop',
		scrollSize: 'scrollHeight',
		size: 'height',
		offset: 'top'
	}
};

describe('horizontal', function () {
	sharedTests('horizontal');
});

describe('vertical', function () {
	sharedTests('vertical');
})


function sharedTests (orientation) {

	beforeEach(function () {
		loadStyleFixtures('style.css');
		loadFixtures(orientation + '.html');

		$div = $('.container');
		scrollable = new pintxos.ScrollableNative($div[0], {
			orientation: orientation
		});
		scrollable.init();

	});

	afterEach(function () {
		scrollable.destroy();
	});

	it("should set scrollLeft/scrollTop using setScrollPos()", function () {

		var pos;

		pos = 10;

		scrollable.setScrollPos(pos);

		expect($div[props[orientation].scrollPos]()).toBe(pos);
		expect(scrollable.getScrollPos()).toBe(pos);
	});

	it("should get the maskwidth correct", function () {
		expect(scrollable.getMaskSize()).toBe($div[props[orientation].size]());
	});

	it("should return the maximum scroll position", function () {

		var maxScrollPos;

		maxScrollPos = $div[0][props[orientation].scrollSize] - $div[props[orientation].size]();
		expect(maxScrollPos).toBe(scrollable.getMaxScrollPos());
	});

	it('_getProp() should return the right properties taking the orientation into account', function () {
		expect(scrollable._getProp('scrollPos')).toBe(props[orientation].scrollPos);
		expect(scrollable._getProp('scrollSize')).toBe(props[orientation].scrollSize);
		expect(scrollable._getProp('size')).toBe(props[orientation].size);
		expect(scrollable._getProp('offset')).toBe(props[orientation].offset);
	});

	it('should indicate whether or not the beginning or the end of the scrollable container is reached', function () {
		var maxScrollPos, offset;

		maxScrollPos = $div[0][props[orientation].scrollSize] - $div[props[orientation].size]();
		offset = 10;

		scrollable.setScrollPos(0);
		expect(scrollable.isBeginReached()).toBe(true);

		scrollable.setScrollPos(maxScrollPos);
		expect(scrollable.isEndReached()).toBe(true);

		scrollable.setScrollPos(offset);
		expect(scrollable.isBeginReached(offset)).toBe(true);

		scrollable.setScrollPos(maxScrollPos - offset);
		expect(scrollable.isEndReached(offset)).toBe(true);
	});

}


