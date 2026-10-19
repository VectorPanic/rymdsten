//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new engine exhaust particle.
 *
 * @constructor
 * @extends rune.particle.Particle
 *
 * @class
 * @classdesc
 *
 * Represents short-lived exhaust emitted behind the player while thrusting.
 */
rymdsten.entity.ThrustSpark = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rune.particle.Particle.
     */
    rune.particle.Particle.call(this, 0, 0, 8, 8, "rymdsten_texture_spark_8x8");

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

rymdsten.entity.ThrustSpark.prototype = Object.create(rune.particle.Particle.prototype);
rymdsten.entity.ThrustSpark.prototype.constructor = rymdsten.entity.ThrustSpark;

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Configures the particle's position, scale and velocity for this emission.
 *
 * @param {rune.particle.Emitter} emitter Emitter that emitted this particle.
 *
 * @returns {undefined}
 */
rymdsten.entity.ThrustSpark.prototype.onEmit = function(emitter) {
    var angle = rune.util.Math.degreesToRadians(
        emitter.rotation + 180 + rune.util.Math.random(-18, 18)
    );
    var speed = rune.util.Math.random(1.5, 3.5);
    this.scaleX = this.scaleY = rune.util.Math.random(0.4, 0.8);
    this.centerX = emitter.centerX;
    this.centerY = emitter.centerY;
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
rymdsten.entity.ThrustSpark.prototype.update = function(step) {
    rune.particle.Particle.prototype.update.call(this, step);
    this.alpha = Math.min(1, Math.max(0, this.lifespan / 180));
};

/**
 * Removes an expired particle in the update that consumes its remaining life.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.ThrustSpark.prototype.postUpdate = function(step) {
    rune.particle.Particle.prototype.postUpdate.call(this, step);
    if (this.lifespan <= 0.000001 && this.parent != null) {
        this.parent.removeChild(this);
    }
};
