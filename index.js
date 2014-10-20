(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.ScrollableNative = definition(jQuery, pintxos.inherit, pintxos.Component);
			define = null;
		};
	}

	define(
	[
		'jQuery',
		'pintxos-inherit',
		'pintxos-component'
	], function (
		$,
		inherit,
		Component
	) {

		var ScrollableNative, _defaults, _props;

		/* Defaults
		----------------------------------------------- */
		_defaults = {
			orientation: 'horizontal',
			selectors: {
				scrollableEl: undefined
			}
		};

		_props = {
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

		/* Constructor
		----------------------------------------------- */
		ScrollableNative = function (el, options) {
			this._settings = $.extend(true, {}, _defaults, options);
			Component.call(this, el, this._settings);
		};

		inherit(ScrollableNative, Component);


		/* Methods
		----------------------------------------------- */

		/**
		 * All bootstrap logic should go here
		 * @return {void}
		 */
		ScrollableNative.prototype.init = function () {
			Component._super.init.call(this);
		};

		ScrollableNative.prototype._getProp = function (prop) {
			return _props[this._settings.orientation][prop];
		};

		ScrollableNative.prototype.getScrollPos = function () {
			return Math.floor(this.getScrollableEl()[this._getProp('scrollPos')]());
		};

		ScrollableNative.prototype.setScrollPos = function (pos) {
			this.getScrollableEl()[this._getProp('scrollPos')](pos);
		};

		ScrollableNative.prototype.getMaskSize = function () {
			return Math.ceil(this.getScrollableEl()[this._getProp('size')]());
		};

		ScrollableNative.prototype.getMaxScrollPos = function () {
			return this.getScrollableEl()[0][this._getProp('scrollSize')] - this.getScrollableEl()[this._getProp('size')]();
		};

		ScrollableNative.prototype.isEndReached = function (offset) {
			offset = (typeof offset === 'undefined') ? 0 : offset;
			return this.getScrollPos() >= (this.getMaxScrollPos() - offset);
		};

		ScrollableNative.prototype.isBeginReached = function (offset) {
			offset = (typeof offset === 'undefined') ? 0 : offset;
			return this.getScrollPos() <= offset;
		};

		/**
		 * Getter for scrollable el
		 * @return {jQuery}
		 */
		ScrollableNative.prototype.getScrollableEl = function () {

			var selector;

			if(typeof this._scrollable === 'undefined') {

				selector = this.getSettings().selectors.scrollableEl;

				if(typeof selector === 'undefined') {

					// defaults to getEl()
					this._scrollable = this.getEl();

				}else if(typeof selector === 'string') {

					// selector
					this._scrollable = this._query(selector);
				}else {

					// jQuery object
					this._scrollable = selector;
				}

			}

			return this._scrollable;
		};


		/* Export
		----------------------------------------------- */
		return ScrollableNative;

	});

})(this);
