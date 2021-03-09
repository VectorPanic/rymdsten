//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.system.Main
 * 
 * @class
 * @classdesc
 * 
 * The main application class.
 */
rymdsten.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.system.Main.call(this, {
        name: "Rymdsten",
        version: "1.0.0",
        id: "com.vectorpanic.rymdsten",
        scene: rymdsten.scene.Splash,
        resources: rymdsten.data.Manifest,
        debug: false,
        useKeyboard: true,
        framerate: 60,
        screenResolutionX: 1280,
        screenResolutionY: 720
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.system.Main.prototype = Object.create(rune.system.Main.prototype);
rymdsten.system.Main.prototype.constructor = rymdsten.system.Main;