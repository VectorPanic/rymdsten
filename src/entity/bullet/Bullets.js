//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @param {rune.display.Stage} stage ...
 *
 * @class
 * @classdesc
 * 
 * Represents a handler for bullets.
 */
rymdsten.entity.Bullets = function(stage) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Maximum number of bullets that can exist simultaneously.
     *
     * @type {number}
     * @default 4
     */
    this.maxNumBullets = 4;
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * Sound for when a new bullet is created.
     *
     * @type {rune.media.Sound}
     * @private
     */
    this.m_soundFire = this.application.sounds.sound.get("rymdsten_sound_bullet_fire");

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.display.DisplayGroup.call(this, stage);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Bullets.prototype = Object.create(rune.display.DisplayGroup.prototype);
rymdsten.entity.Bullets.prototype.constructor = rymdsten.entity.Bullets;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a new bullet at a specific position.
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
rymdsten.entity.Bullets.prototype.create = function(x, y) {
    if (this.numChildren == this.maxNumBullets) {
        this.removeChild(this.getChildAt(0));
    }

    var bullet = new rymdsten.entity.Bullet();
        bullet.x = (x || 0) - (bullet.width  >> 1);
        bullet.y = (y || 0) - (bullet.height >> 1);

    this.addChild(bullet);
    this.m_soundFire.play(true);
    
    return bullet;
};

/**
 * Resets all bullets.
 *
 * @return {undefined}
 */
rymdsten.entity.Bullets.prototype.reset = function() {
    this.removeChildren();
};