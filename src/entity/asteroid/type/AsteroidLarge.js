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
 * Represents a large asteroid.
 */
rymdsten.entity.AsteroidLarge = function(x, y) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
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
    this.soundKill = this.resources.get("rymdsten_sound_asteroid_explode_large");
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
    this.cameras.getCamera(0).flash.start();
    this.cameras.getCamera(0).shake.start(1000, 10, 10, true); //@note: Magic numbers.
};