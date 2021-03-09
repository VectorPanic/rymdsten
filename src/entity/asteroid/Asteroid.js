//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Body
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 * @param {number} [width=0] ...
 * @param {number} [height=0] ...
 * @param {number} [fillColor=0x0] ...
 * @param {string} [texture] ...
 * @param {string} [sound] ...
 *
 * @class
 * @classdesc
 * 
 * Represents an asteroid.
 */
rymdsten.entity.Asteroid = function(x, y, width, height, color, texture, sound) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Parts created when the asteroid is destroyed.
     * 
     * @type {Array}
     */
    this.parts = [];

    /**
     * Indicates the value of the asteroid.
     * 
     * @type {number}
     */
    this.score = 0;

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Sounds played when an asteroid is hit by a bullet.
     *
     * @type {rune.media.Sound}
     * @private
     */
    this.m_soundHit = this.application.sounds.sound.get("rymdsten_sound_asteroid_hit");

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rymdsten.entity.Body.call(this, x, y, width, height, color, texture);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Asteroid.prototype = Object.create(rymdsten.entity.Body.prototype);
rymdsten.entity.Asteroid.prototype.constructor = rymdsten.entity.Asteroid;

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Asteroid.prototype.hurt = function(damage) {
    rymdsten.entity.Body.prototype.hurt.call(this, damage);
    if (this.health > 0) {
        this.m_soundHit.play(true);
        this.flicker(500, 60);
    }
};

/**
 * @inheritDoc
 */
rymdsten.entity.Asteroid.prototype.kill = function() {
    if (this.soundKill != null) {
        this.soundKill.play(true);
    }
    
    if (this.group != null) {
        for (var i = 0; i < this.parts.length; i++) {
            this.group.create(this.x, this.y, this.parts[i]);
        }
        
        this.group.removeChild(this);
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Asteroid.prototype.init = function() {
    rymdsten.entity.Body.prototype.init.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Asteroid.prototype.m_initAnimation = function() {
    this.animations.add("idle", [0, 1, 2], 0, true);
    this.animations.gotoRandomFrame();
};

/**
 * @inheritDoc
 */
rymdsten.entity.Asteroid.prototype.m_initPhysics = function() {
    this.velocity.max.x = (10 - this.mass) >> 2;
    this.velocity.max.y = (10 - this.mass) >> 2;
    this.velocity.x = rune.util.Math.random(-this.velocity.max.x, this.velocity.max.x);
    this.velocity.y = rune.util.Math.random(-this.velocity.max.y, this.velocity.max.y);
    this.velocity.angular = rune.util.Math.random(-this.velocity.max.x, this.velocity.max.x);
};