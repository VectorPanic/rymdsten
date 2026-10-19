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
 * Represents a small asteroid.
 */
rymdsten.entity.AsteroidSmall = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rymdsten.entity.Asteroid.
     */
    rymdsten.entity.Asteroid.call(this, x, y, 16, 16, "", "rymdsten_texture_asteroid_small_16x16");

    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------

    /**
     * @inheritDoc
     */
    this.elasticity = 2.0;

    /**
     * @inheritDoc
     */
    this.health = 20.0;

    /**
     * @inheritDoc
     */
    this.mass = 1.0;

    /**
     * @inheritDoc
     */
    this.score = 100;

    /**
     * @inheritDoc
     */
    this.soundKill = this.application.sounds.sound.get("rymdsten_sound_asteroid_explode_small");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.AsteroidSmall.prototype = Object.create(rymdsten.entity.Asteroid.prototype);
rymdsten.entity.AsteroidSmall.prototype.constructor = rymdsten.entity.AsteroidSmall;
