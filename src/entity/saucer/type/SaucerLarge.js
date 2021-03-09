//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Saucer
 *
 * @param {rymdsten.entity.Saucers} saucers ...
 *
 * @class
 * @classdesc
 * 
 * Represents a large saucer.
 */
rymdsten.entity.SaucerLarge = function(saucers) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rymdsten.entity.Saucer.call(this, 40, 24, "rymdsten_texture_saurcer_large_40x24", saucers);
    
    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------
    
    /**
     * @inheritDoc
     */
    this.attack = 5000;
    
    /**
     * @inheritDoc
     */
    this.aiming = 360;
    
    /**
     * @inheritDoc
     */
    this.beat = this.resources.get("rymdsten_sound_saucer_beat_large");
    
    /**
     * @inheritDoc
     */
    this.score = 200;
    
    /**
     * @inheritDoc
     */
    this.speed = 0.5;
    
    /**
     * @inheritDoc
     */
    this.targeting = 8000;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.SaucerLarge.prototype = Object.create(rymdsten.entity.Saucer.prototype);
rymdsten.entity.SaucerLarge.prototype.constructor = rymdsten.entity.SaucerLarge;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.SaucerLarge.prototype.m_initHitbox = function() {
    this.hitbox.set(
        8,
        2,
        24,
        20
    );
};

/**
 * @inheritDoc
 */
rymdsten.entity.SaucerLarge.prototype.m_updateMovementDirections = function(step) {
    this.m_movement.x = rune.util.Math.randomInt(0, 2);
    if (this.m_movement.x == 0) {
        this.m_movement.y = rune.util.Math.randomInt(1, 2);
    } else {
        this.m_movement.y = rune.util.Math.randomInt(0, 2);
    }
};