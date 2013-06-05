/*global define*/
define([
        '../../Core/defineProperties',
        '../../Core/DeveloperError',
        '../createCommand',
        '../../ThirdParty/knockout'
    ], function(
        defineProperties,
        DeveloperError,
        createCommand,
        knockout) {
    "use strict";

    /**
     * A view model that represents each item in the BaseLayerPicker.
     *
     * @alias ImageryProviderViewModel
     * @constructor
     *
     * @param {Object} description The object containing all parameters.
     * @param {String|Observable} description.name The name of the layer.
     * @param {String|Observable} description.tooltip The tooltip to show when the item is moused over.
     * @param {String|Observable} description.iconUrl An icon representing the layer.
     * @param {Function|Command} description.creationFunction A function or Command which creates the ImageryProvider to be added to the layers collection.
     *
     * @exception {DeveloperError} description.name is required.
     * @exception {DeveloperError} description.tooltip is required.
     * @exception {DeveloperError} description.iconUrl is required.
     * @exception {DeveloperError} description.creationCommand is required.
     *
     * @see BaseLayerPicker
     * @see ImageryProvider
     */
    var ImageryProviderViewModel = function(description) {
        if (typeof description.name === 'undefined') {
            throw new DeveloperError('description.name is required.');
        }

        if (typeof description.tooltip === 'undefined') {
            throw new DeveloperError('description.tooltip is required.');
        }

        if (typeof description.iconUrl === 'undefined') {
            throw new DeveloperError('description.iconUrl is required.');
        }

        if (typeof description.creationFunction !== 'function') {
            throw new DeveloperError('description.creationFunction is required.');
        }

        var creationCommand = description.creationFunction;
        if (typeof creationCommand.canExecute === 'undefined') {
            creationCommand = createCommand(creationCommand);
        }

        this._creationCommand = creationCommand;

        /**
         * Gets the display name.  This property is observable.
         * @type String
         */
        this.name = description.name;

        /**
         * Gets the tooltip.  This property is observable.
         * @type String
         */
        this.tooltip = description.tooltip;

        /**
         * Gets the icon.  This property is observable.
         * @type String
         */
        this.iconUrl = description.iconUrl;

        knockout.track(this, ['name', 'tooltip', 'iconUrl']);
    };

    defineProperties(ImageryProviderViewModel.prototype, {
        /**
         * Gets the Command called to create the imagery provider.
         * @memberof ImageryProviderViewModel.prototype
         *
         * @type Command
         */
        creationCommand : {
            get : function() {
                return this._creationCommand;
            }
        }
    });

    return ImageryProviderViewModel;
});