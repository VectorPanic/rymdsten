//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new ship debris particle.
 *
 * @constructor
 * @extends rune.particle.Particle
 *
 * @class
 * @classdesc
 *
 * Represents a rotating ship fragment that drifts and fades after destruction.
 */
rymdsten.entity.ShipDebris = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 16, 16, "rymdsten_texture_debris_16x16");

    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------

    /**
     * @inheritDoc
     */
    this.movable = true;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.ShipDebris.prototype = Object.create(rune.particle.Particle.prototype);
rymdsten.entity.ShipDebris.prototype.constructor = rymdsten.entity.ShipDebris;

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Configures the fragment's position, scale and velocity for this emission.
 *
 * @param {rune.particle.Emitter} emitter Emitter that emitted this particle.
 *
 * @returns {undefined}
 */
rymdsten.entity.ShipDebris.prototype.onEmit = function(emitter) {
    var angle = rune.util.Math.random(0, Math.PI * 2);
    var speed = rune.util.Math.random(1, 3);
    this.scaleX = this.scaleY = rune.util.Math.random(0.5, 1);
    this.rotation = rune.util.Math.random(0, 360);
    this.centerX = emitter.centerX + rune.util.Math.random(-6, 6);
    this.centerY = emitter.centerY + rune.util.Math.random(-6, 6);
    this.velocity.x = emitter.velocity.x + Math.cos(angle) * speed;
    this.velocity.y = emitter.velocity.y + Math.sin(angle) * speed;
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates the particle and fades its final moments.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.ShipDebris.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step);
    this.alpha = Math.min(1, Math.max(0, this.lifespan / 400));
};

/**
 * Removes an expired particle in the update that consumes its remaining life.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.ShipDebris.prototype.postUpdate = function(step) {
    rune.particle.Particle.prototype.postUpdate.call(this, step);
    if (this.lifespan <= 0.000001 && this.parent != null) {
        this.parent.removeChild(this);
    }
};
