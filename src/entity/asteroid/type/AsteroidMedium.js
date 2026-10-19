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
 * Represents a medium asteroid.
 */
rymdsten.entity.AsteroidMedium = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rymdsten.entity.Asteroid.
     */
    rymdsten.entity.Asteroid.call(this, x, y, 30, 30, "", "rymdsten_texture_asteroid_medium_30x30");

    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------

    /**
     * @inheritDoc
     */
    this.elasticity = 1.0;

    /**
     * @inheritDoc
     */
    this.health = 40.0;

    /**
     * @inheritDoc
     */
    this.mass = 2.5;

    /**
     * @inheritDoc
     */
    this.parts = ["small", "small", "small", "small", "small", "small"];

    /**
     * @inheritDoc
     */
    this.score = 50;

    /**
     * @inheritDoc
     */
    this.soundKill = this.application.sounds.sound.get("rymdsten_sound_asteroid_explode_medium");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.AsteroidMedium.prototype = Object.create(rymdsten.entity.Asteroid.prototype);
rymdsten.entity.AsteroidMedium.prototype.constructor = rymdsten.entity.AsteroidMedium;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.AsteroidMedium.prototype.kill = function() {
    rymdsten.entity.Asteroid.prototype.kill.call(this);
    this.application.scenes.selected.cameras.getCameraAt(0).shake.start(1000, 5, 5, true); //@note: Magic numbers.
};
