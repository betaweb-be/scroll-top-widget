/*!
 * Scroll-up v0.1.0
 *
 * Copyright 2017 www.betaweb.be
 * Licensed under MIT
 */
namespace Betaweb.Util {
    "use strict";

    /**
     * Scroll configuration
     */
    interface ScrollConfig {
        elementId?:string;
        scrollOffset?:number;
        scrollSpeed?:number;
        scrollText ?:string;
        container?:string;
    }

    /**
     * ScrollTop class
     *
     * This class adds an element to the bottom right of a page that
     * will scroll the page to the top when clicked on
     */
    export class ScrollTop implements ScrollConfig {

        /**
         * The element where all the fuzz is about
         *
         * @type {object}
         */
        private scrollElement:any;

        /**
         * The id that will be used for the element
         * @type {string}
         */
        elementId:string = 'scroll-up';

        /**
         * The element is hidden until we have scrolled at least this value (in px)
         * @type {number}
         */
        scrollOffset:number = 300;

        /**
         * The speed (in milliseconds) it'll take to scroll all the way up
         * @type {number}
         */
        scrollSpeed:number = 300;

        /**
         * The text that will be placed in the element
         * @type {string}
         */
        scrollText:string = 'Scroll to top';

        /**
         * The selector for the container where the element will be appended to
         * @type {string}
         */
        container:string = 'body';

        /**
         * Class constructor
         *
         * @param config
         */
        constructor(config?:ScrollConfig) {
            // check if we need to set a config
            if (config) {
                this.initConfig(config);
            }

            // let's get us started
            this.createElement();
            this.initEvents();
        };

        /**
         * Reload the "scroll to top" widget with the current config
         */
        public reload = () => {
            // remove the scroll element if it was already rendered
            if (this.scrollElement) {
                this.scrollElement.parentNode.removeChild(this.scrollElement);
            }

            // let's get us started
            this.createElement();
        };

        /**
         * Set the config items for the scroll container
         *
         * @param config
         */
        private initConfig = (config:ScrollConfig):void => {
            for (let configKey in config) {
                if (config.hasOwnProperty(configKey) && this.hasOwnProperty(configKey)) {
                    this[configKey] = config[configKey]
                }
            }
        };

        /**
         * Create the element and add it to the DOM
         */
        private createElement = ():void => {
            // create the element
            this.scrollElement = document.createElement('a');

            // set the properties
            this.scrollElement.id = this.elementId;
            this.scrollElement.title = this.scrollText;
            this.scrollElement.className = 'scroll-up';
            this.scrollElement.href = '#';
            this.scrollElement.role = 'button';

            // add the content in a span
            let span = document.createElement('span');
            span.className ='scroll-up__text';
            span.innerText = this.scrollText;
            this.scrollElement.appendChild(span);

            // check if we need to show or hide the element
            this.scrollElement.style.display = this.getScrollOffset() < this.scrollOffset ? 'none' : '';

            // add the element to the DOM
            const container = document.querySelector(this.container);
            if (container) {
                container.appendChild(this.scrollElement);
            }

            // scroll to the top when the element is clicked on
            const self = this;
            this.scrollElement.addEventListener('click', (e) => {
                e.preventDefault();
                self.scrollToTop();
            });
        };

        /**
         * Initialize the event listeners
         */
        private initEvents = ():void => {
            const self = this;

            // Listen for the scroll event and show/hide the element accordingly
            window.addEventListener('scroll', () => (this.scrollElement.style.display = this.getScrollOffset() < this.scrollOffset ? 'none' : ''));
        };

        /**
         * Scroll to the top of the page
         */
        public scrollToTop = () => {
            // determine the scroll step
            const scrollStep = -window.scrollY / (this.scrollSpeed / 10);

            // create an interval to scroll to the top
            let scrollInterval = setInterval(() => {
                if (window.scrollY != 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 10);
        };

        /**
         * Get the number of pixels we've already scrolled
         * @returns {number}
         */
        private getScrollOffset = ():number => {
            return document.querySelector('body').scrollTop;
        };
    }
}