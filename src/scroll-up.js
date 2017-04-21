/*!
 * Scroll-up v0.1.0
 *
 * Copyright 2017 www.betaweb.be
 * Licensed under MIT
 */
var Betaweb;
(function (Betaweb) {
    var Util;
    (function (Util) {
        "use strict";
        /**
         * ScrollUp class
         *
         * This class adds an element to the bottom right of a page that
         * will scroll the page to the top when clicked on
         */
        var ScrollUp = (function () {
            /**
             * Class constructor
             *
             * @param config
             */
            function ScrollUp(config) {
                var _this = this;
                /**
                 * The id that will be used for the element
                 * @type {string}
                 */
                this.elementId = 'scroll-up';
                /**
                 * The element is hidden until we have scrolled at least this value (in px)
                 * @type {number}
                 */
                this.scrollOffset = 300;
                /**
                 * The speed (in milliseconds) it'll take to scroll all the way up
                 * @type {number}
                 */
                this.scrollSpeed = 300;
                /**
                 * The text that will be placed in the element
                 * @type {string}
                 */
                this.scrollText = 'Scroll to top';
                /**
                 * The selector for the container where the element will be appended to
                 * @type {string}
                 */
                this.container = 'body';
                /**
                 * Set the config items for the scroll container
                 *
                 * @param config
                 */
                this.initConfig = function (config) {
                    for (var configKey in config) {
                        if (config.hasOwnProperty(configKey) && _this.hasOwnProperty(configKey)) {
                            _this[configKey] = config[configKey];
                        }
                    }
                };
                /**
                 * Create the element and add it to the DOM
                 */
                this.createElement = function () {
                    // create the element
                    _this.scrollElement = document.createElement('a');
                    // set the properties
                    _this.scrollElement.id = _this.elementId;
                    _this.scrollElement.innerText = _this.scrollText;
                    _this.scrollElement.href = '#';
                    _this.scrollElement.role = 'button';
                    // check if we need to show or hide the element
                    _this.scrollElement.style.display = _this.getScrollOffset() < _this.scrollOffset ? 'none' : '';
                    // add the element to the DOM
                    var container = document.querySelector(_this.container);
                    if (container) {
                        container.appendChild(_this.scrollElement);
                    }
                };
                /**
                 * Initialize the event listeners
                 */
                this.initEvents = function () {
                    var self = _this;
                    // Listen for the scroll event and show/hide the element accordingly
                    window.addEventListener('scroll', function () { return (_this.scrollElement.style.display = _this.getScrollOffset() < _this.scrollOffset ? 'none' : ''); });
                    // scroll to the top when the element is clicked on
                    _this.scrollElement.addEventListener('click', function (e) {
                        e.preventDefault();
                        self.scrollToTop();
                    });
                };
                /**
                 * Scroll to the top of the page
                 */
                this.scrollToTop = function () {
                    // determine the scroll step
                    var scrollStep = -window.scrollY / (_this.scrollSpeed / 10);
                    // create an interval to scroll to the top
                    var scrollInterval = setInterval(function () {
                        if (window.scrollY != 0) {
                            window.scrollBy(0, scrollStep);
                        }
                        else {
                            clearInterval(scrollInterval);
                        }
                    }, 10);
                };
                /**
                 * Get the number of pixels we've already scrolled
                 * @returns {number}
                 */
                this.getScrollOffset = function () {
                    return document.querySelector('body').scrollTop;
                };
                // check if we need to set a config
                if (config) {
                    this.initConfig(config);
                }
                // let's get us started
                this.createElement();
                this.initEvents();
            }
            ;
            return ScrollUp;
        }());
        Util.ScrollUp = ScrollUp;
    })(Util = Betaweb.Util || (Betaweb.Util = {}));
})(Betaweb || (Betaweb = {}));
//# sourceMappingURL=scroll-up.js.map