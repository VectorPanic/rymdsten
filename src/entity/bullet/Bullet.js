//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Body
 *
 * @param {number} x Horizontal position in pixels.
 * @param {number} y Vertical position in pixels.
 *
 * @class
 * @classdesc
 *
 * Represents a bullet.
 */
rymdsten.entity.Bullet = function(x, y) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * The amount of damage the bullet causes.
     *
     * @type {number}
     * @default 20
     */
    this.damage = 20.0;

    //--------------------------------------------------------------------------
    // Protected properties
    //--------------------------------------------------------------------------

    /**
     * Velocity added per 60 Hz reference step.
     *
     * @type {number}
     * @protected
     */
    this.m_speed = 0.08;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rymdsten.entity.Body.
     */
    rymdsten.entity.Body.call(this, x, y, 3, 3, "#ffffffff");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Bullet.prototype = Object.create(rymdsten.entity.Body.prototype);
rymdsten.entity.Bullet.prototype.constructor = rymdsten.entity.Bullet;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Bullet.prototype.update = function(step) {
    rymdsten.entity.Body.prototype.update.call(this, step);
    this.m_updateMotion(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Calculates movement.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Bullet.prototype.m_updateMotion = function(step) {
    var scale = step / (1000 / 60);
    this.velocity.x += Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed * scale;
    this.velocity.y += Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_speed * scale;
};
