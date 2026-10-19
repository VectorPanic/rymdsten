//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rune.display.Stage} stage Scene stage that contains the bullets.
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
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     *  Extend rune.display.DisplayGroup.
     */
    rune.display.DisplayGroup.call(this, stage);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Bullets.prototype = Object.create(rune.display.DisplayGroup.prototype);
rymdsten.entity.Bullets.prototype.constructor = rymdsten.entity.Bullets;

//------------------------------------------------------------------------------
// Public prototype methods
//------------------------------------------------------------------------------

/**
 * Creates a new bullet at a specific position.
 *
 * @param {number} [x=0] Horizontal position in pixels.
 * @param {number} [y=0] Vertical position in pixels.
 *
 * @returns {rymdsten.entity.Bullet}
 */
rymdsten.entity.Bullets.prototype.create = function(x, y) {
    if (this.numMembers == this.maxNumBullets) {
        this.removeMember(this.getMemberAt(0));
    }

    var bullet = new rymdsten.entity.Bullet();
    bullet.centerX = x || 0;
    bullet.centerY = y || 0;

    this.addMember(bullet);
    this.m_soundFire.play(true);

    return bullet;
};

/**
 * Resets all bullets.
 *
 * @returns {undefined}
 */
rymdsten.entity.Bullets.prototype.reset = function() {
    this.removeMembers();
};
