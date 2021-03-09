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
 * Represents a small saucer.
 */
rymdsten.entity.SaucerSmall = function(saucers) {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rymdsten.entity.Saucer.call(this, 20, 20, "rymdsten_texture_saurcer_small_20x20", saucers);
    
    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------
    
    /**
     * @inheritDoc
     */
    this.attack = 1000;
    
    /**
     * @inheritDoc
     */
    this.aiming = 2;
    
    /**
     * @inheritDoc
     */
    this.beat = this.resources.get("rymdsten_sound_saucer_beat_small");
    
    /**
     * @inheritDoc
     */
    this.score = 1000;
    
    /**
     * @inheritDoc
     */
    this.speed = 1.2;
    
    /**
     * @inheritDoc
     */
    this.targeting = 2000;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.SaucerSmall.prototype = Object.create(rymdsten.entity.Saucer.prototype);
rymdsten.entity.SaucerSmall.prototype.constructor = rymdsten.entity.SaucerSmall;
 
//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.SaucerSmall.prototype.m_initHitbox = function() {
    this.hitbox.set(
        0,
        5,
        20,
        10
    );
};

/**
 * ... 
 *
 * @param {number} step ...
 *
 * @return {undefined}
 */
rymdsten.entity.SaucerSmall.prototype.m_updateMovementDirections = function(step) {
    if (this.m_saucers.game.ships.numChildren > 0) {
        var target = this.m_saucers.game.ships.getChildAt(0);
        
        var da = Math.abs(this.centerX - target.centerX);
        
        if (da < 640) { //@todo: Magic number.
            if      (this.centerX > target.centerX) this.m_movement.x = 1;
            else if (this.centerX < target.centerX) this.m_movement.x = 2;
            
            if      (this.centerY > target.centerY) this.m_movement.y = 1;
            else if (this.centerY < target.centerY) this.m_movement.y = 2;
        } else {
            if (this.centerX < 640) { //@todo: Magic number.
                this.m_movement.x = 1;
            } else {
                this.m_movement.x = 2;
            }
        } 
    }
};