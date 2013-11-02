/*global define*/
define(['Core/defined', 'Core/defineProperties', 'Core/DeveloperError', 'Core/destroyObject', 'Widgets/SvgPath/SvgPath', 'Widgets/getElement', 'Widgets/subscribeAndEvaluate', 'Widgets/FullscreenButton/FullscreenButtonViewModel', 'ThirdParty/knockout'], function(
        defined,
        defineProperties,
        DeveloperError,
        destroyObject,
        SvgPath,
        getElement,
        subscribeAndEvaluate,
        FullscreenButtonViewModel,
        knockout) {
    "use strict";

    var enterFullScreenPath = 'M 83.96875 17.5625 L 83.96875 17.59375 L 76.65625 24.875 L 97.09375 24.96875 L 76.09375 45.96875 L 81.9375 51.8125 L 102.78125 30.9375 L 102.875 51.15625 L 110.15625 43.875 L 110.1875 17.59375 L 83.96875 17.5625 z M 44.125 17.59375 L 17.90625 17.625 L 17.9375 43.90625 L 25.21875 51.1875 L 25.3125 30.96875 L 46.15625 51.8125 L 52 45.96875 L 31 25 L 51.4375 24.90625 L 44.125 17.59375 z M 46.0625 76.03125 L 25.1875 96.875 L 25.09375 76.65625 L 17.8125 83.9375 L 17.8125 110.21875 L 44 110.25 L 51.3125 102.9375 L 30.90625 102.84375 L 51.875 81.875 L 46.0625 76.03125 z M 82 76.15625 L 76.15625 82 L 97.15625 103 L 76.71875 103.0625 L 84.03125 110.375 L 110.25 110.34375 L 110.21875 84.0625 L 102.9375 76.8125 L 102.84375 97 L 82 76.15625 z';
    var exitFullScreenPath = 'M 104.34375 17.5625 L 83.5 38.4375 L 83.40625 18.21875 L 76.125 25.5 L 76.09375 51.78125 L 102.3125 51.8125 L 102.3125 51.78125 L 109.625 44.5 L 89.1875 44.40625 L 110.1875 23.40625 L 104.34375 17.5625 z M 23.75 17.59375 L 17.90625 23.4375 L 38.90625 44.4375 L 18.5 44.53125 L 25.78125 51.8125 L 52 51.78125 L 51.96875 25.53125 L 44.6875 18.25 L 44.625 38.46875 L 23.75 17.59375 z M 25.6875 76.03125 L 18.375 83.3125 L 38.78125 83.40625 L 17.8125 104.40625 L 23.625 110.25 L 44.5 89.375 L 44.59375 109.59375 L 51.875 102.3125 L 51.875 76.0625 L 25.6875 76.03125 z M 102.375 76.15625 L 76.15625 76.1875 L 76.1875 102.4375 L 83.46875 109.71875 L 83.5625 89.53125 L 104.40625 110.375 L 110.25 104.53125 L 89.25 83.53125 L 109.6875 83.46875 L 102.375 76.15625 z';

    /**
     * A single button widget for toggling fullscreen mode.
     *
     * @alias FullscreenButton
     * @constructor
     *
     * @param {Element|String} container The DOM element or ID that will contain the widget.
     * @param {Element} [fullscreenElement=document.body] The element to be placed into fullscreen mode.
     *
     * @exception {DeveloperError} container is required.
     * @exception {DeveloperError} Element with id "container" does not exist in the document.
     *
     * @see Fullscreen
     */
    var FullscreenButton = function(container, fullscreenElement) {
        if (!defined(container)) {
            throw new DeveloperError('container is required.');
        }

        container = getElement(container);

        this._container = container;
        this._viewModel = new FullscreenButtonViewModel(fullscreenElement);

        this._element = document.createElement('button');
        this._element.type = 'button';
        this._element.className = 'cesium-widget-button cesium-fullscreenButton';
        this._element.setAttribute('data-bind', '\
attr: { title: tooltip },\
click: command,\
enable: isFullscreenEnabled');
        this._svgPath = new SvgPath(this._element, 128, 128, enterFullScreenPath);
        container.appendChild(this._element);

        knockout.applyBindings(this._viewModel, this._element);

        var that = this;
        this._subscription = subscribeAndEvaluate(this._viewModel, 'isFullscreen', function(isFullscreen) {
            that._svgPath.path = isFullscreen ? exitFullScreenPath : enterFullScreenPath;
        });
    };

    defineProperties(FullscreenButton.prototype, {
        /**
         * Gets the parent container.
         * @memberof FullscreenButton.prototype
         *
         * @type {Element}
         */
        container : {
            get : function() {
                return this._container;
            }
        },

        /**
         * Gets the view model.
         * @memberof FullscreenButton.prototype
         *
         * @type {FullscreenButtonViewModel}
         */
        viewModel : {
            get : function() {
                return this._viewModel;
            }
        }
    });

    /**
     * @memberof FullscreenButton
     * @returns {Boolean} true if the object has been destroyed, false otherwise.
     */
    FullscreenButton.prototype.isDestroyed = function() {
        return false;
    };

    /**
     * Destroys the widget.  Should be called if permanently
     * removing the widget from layout.
     * @memberof FullscreenButton
     */
    FullscreenButton.prototype.destroy = function() {
        this._subscription.dispose();
        var container = this._container;
        knockout.cleanNode(this._element);
        this._viewModel.destroy();
        container.removeChild(this._element);
        return destroyObject(this);
    };

    return FullscreenButton;
});
