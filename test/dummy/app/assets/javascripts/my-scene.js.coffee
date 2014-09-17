define [
    'Cesium/Scene/Scene'
], (Cesium_Scene) ->

    Wrapped_Cesium_Scene = ->
        Cesium_Scene.apply @, arguments
        console.debug "I'm a wrapped Cesium.Scene:", @

    Wrapped_Cesium_Scene.prototype = Object.create(Cesium_Scene.prototype)

    return Wrapped_Cesium_Scene
