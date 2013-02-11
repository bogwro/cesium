/*global define*/
define(['./Cartographic',
        './Cartesian3'
    ], function(
        Cartographic,
        Cartesian3) {
    "use strict";

    /**
     * DOC_TBA
     *
     * @exports PolylinePipeline
     */
    var PolylinePipeline = {
        /**
         * Breaks a {@link Polyline} into segments such that it does not cross the &plusmn;180 degree meridian of an ellipsoid.
         *
         * @param {Ellipsoid} ellipsoid The ellipsoid to wrap around.
         * @param {Array} positions The polyline's Cartesian positions.
         *
         * @returns An array of polyline segment objects containing the Cartesian and {@link Cartographic} positions and indices.
         *
         * @see Polyline
         * @see PolylineCollection
         *
         * @example
         * var polylines = new PolylineCollection();
         * polylines.add(...);
         * var positions = polylines.get(0).getPositions();
         * var segments = PolylinePipeline.wrapLongitude(ellipsoid, positions);
         */
        wrapLongitude : function(ellipsoid, positions) {
            var segments = [];

            if (positions && (positions.length > 0)) {
                var length = positions.length;

                var currentSegment = [{
                    cartesian : Cartesian3.clone(positions[0]),
                    cartographic : ellipsoid.cartesianToCartographic(positions[0]),
                    index : 0
                }];

                var prev = currentSegment[0].cartographic;

                for ( var i = 1; i < length; ++i) {
                    var cur = ellipsoid.cartesianToCartographic(positions[i]);

                    if (Math.abs(prev.longitude - cur.longitude) > Math.PI) {
                        var interpolatedLongitude = prev.longitude < 0.0 ? -Math.PI : Math.PI;
                        var longitude = cur.longitude + (2.0 * interpolatedLongitude);
                        var ratio = (interpolatedLongitude - prev.longitude) / (longitude - prev.longitude);
                        var interpolatedLatitude = prev.latitude + (cur.latitude - prev.latitude) * ratio;
                        var interpolatedHeight = prev.height + (cur.height - prev.height) * ratio;

                        currentSegment.push({
                            cartesian : ellipsoid.cartographicToCartesian(new Cartographic(interpolatedLongitude, interpolatedLatitude, interpolatedHeight)),
                            cartographic : new Cartographic(interpolatedLongitude, interpolatedLatitude, interpolatedHeight),
                            index : i
                        });
                        segments.push(currentSegment);

                        currentSegment = [];
                        currentSegment.push({
                            cartesian : ellipsoid.cartographicToCartesian(new Cartographic(-interpolatedLongitude, interpolatedLatitude, interpolatedHeight)),
                            cartographic : new Cartographic(-interpolatedLongitude, interpolatedLatitude, interpolatedHeight),
                            index : i
                        });
                    }

                    currentSegment.push({
                        cartesian : Cartesian3.clone(positions[i]),
                        cartographic : ellipsoid.cartesianToCartographic(positions[i]),
                        index : i
                    });

                    prev = cur.clone();
                }

                if (currentSegment.length > 1) {
                    segments.push(currentSegment);
                }
            }

            return segments;
        }
    };

    return PolylinePipeline;
});