//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Asteroid
 *
 * @param {number} x ...
 * @param {number} y ...
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
     * ...
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
    this.soundKill = this.resources.get("rymdsten_sound_asteroid_explode_small");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.AsteroidSmall.prototype = Object.create(rymdsten.entity.Asteroid.prototype);
rymdsten.entity.AsteroidSmall.prototype.constructor = rymdsten.entity.AsteroidSmall;