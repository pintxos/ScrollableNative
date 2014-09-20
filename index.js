(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.ScrollableNative = definition();
			define = null;
		};
	}

	define([], function () {

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
		var ScrollableNative = function (el, options) {
			this._settings = $.extend(true, {}, _default, options);
			Component.call(el, this._settings);
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
			return this._query(this.getSettings().selectors.scrollableEl);
		};



		/* Event handlers
		----------------------------------------------- */


		/* Export
		----------------------------------------------- */
		return ScrollableNative;

	});

})(this);
