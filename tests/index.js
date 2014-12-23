beforeEach(function () {
	jasmine.getFixtures().fixturesPath = '/base/tests/fixtures/';
	loadFixtures('index.html');

	$slider = $('#container');
	slider = new pintxos.ScrollableNative($slider).init();
});


describe('setup', function () {

	it("should work", function () {
		expect(true).toBe(true);
	});
});
