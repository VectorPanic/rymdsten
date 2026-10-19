//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Asteroid
 *
 * @param {number} x Horizontal position in pixels.
 * @param {number} y Vertical position in pixels.
 *
 * @class
 * @classdesc
 *
 * Represents a large asteroid.
 */
rymdsten.entity.AsteroidLarge = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rymdsten.entity.Asteroid.
     */
    rymdsten.entity.Asteroid.call(this, x, y, 80, 80, "", "rymdsten_texture_asteroid_large_80x80");

    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------

    /**
     * @inheritDoc
     */
    this.elasticity = 0.0;

    /**
     * @inheritDoc
     */
    this.health = 80.0;

    /**
     * @inheritDoc
     */
    this.mass = 6.0;

    /**
     * @inheritDoc
     */
    this.parts = ["medium", "medium", "medium"];

    /**
     * @inheritDoc
     */
    this.score = 20;

    /**
     * @inheritDoc
     */
    this.soundKill = this.application.sounds.sound.get("rymdsten_sound_asteroid_explode_large");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.AsteroidLarge.prototype = Object.create(rymdsten.entity.Asteroid.prototype);
rymdsten.entity.AsteroidLarge.prototype.constructor = rymdsten.entity.AsteroidLarge;

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.AsteroidLarge.prototype.kill = function() {
    rymdsten.entity.Asteroid.prototype.kill.call(this);
    var camera = this.application.scenes.selected.cameras.getCameraAt(0);
    camera.glitch.start(1750, 8);
    camera.flash.start();
    camera.shake.start(1000, 10, 10, true); //@note: Magic numbers.
};
