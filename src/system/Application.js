//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.system.Application
 *
 * @class
 * @classdesc
 *
 * The main application class.
 */
rymdsten.system.Application = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rune.system.Application.
     */
    rune.system.Application.call(this, {
        app: "rymdsten",
        build: "1.0.0",
        developer: "com.vectorpanic",
        scene: rymdsten.scene.Splash,
        resources: rymdsten.data.Requests,
        debug: false,
        useKeyboard: true,
        useGamepads: true,
        framerate: 60,
        screenResolutionX: 1280,
        screenResolutionY: 720
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.system.Application.prototype = Object.create(rune.system.Application.prototype);
rymdsten.system.Application.prototype.constructor = rymdsten.system.Application;
