//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Body
 *
 * @param {number} width Width of the object in pixels.
 * @param {number} height Height of the object in pixels.
 * @param {string} texture Name of the texture resource.
 * @param {rymdsten.entity.Saucers} saucers Group that owns the saucer.
 *
 * @class
 * @classdesc
 *
 * Represents a large saucer.
 */
rymdsten.entity.Saucer = function(width, height, texture, saucers) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Delay between attacks.
     *
     * @type {number}
     * @default 0
     */
    this.attack = 0;

    /**
     * Precision for fired bullets.
     *
     * @type {number}
     * @default 0
     */
    this.aiming = 0;

    /**
     * Continuous sound.
     *
     * @type {rune.media.Sound}
     * @default 0
     */
    this.beat = null;

    /**
     * The value of the object.
     *
     * @type {number}
     * @default 0
     */
    this.score = 0;

    /**
     * Object speed.
     *
     * @type {number}
     * @default 0.5
     */
    this.speed = 0.5;

    /**
     * Targeting delay.
     *
     * @type {number}
     * @default 2000
     */
    this.targeting = 2000;

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Attack counter.
     *
     * @type {number}
     */
    this.m_attack = 0;

    /**
     * Movement tracker.
     *
     * @type {rune.geom.Point}
     */
    this.m_movement = new rune.geom.Point(0, 0);

    /**
     * Reference to handler.
     *
     * @type {rymdsten.entity.Saucers}
     * @private
     */
    this.m_saucers = saucers;

    /**
     * Targeting counter.
     *
     * @type {number}
     * @private
     */
    this.m_targeting = 0;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rymdsten.entity.Body.
     */
    rymdsten.entity.Body.call(this, 0, 0, width, height, "", texture);

    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------

    /**
     * @inheritDoc
     */
    this.soundKill = this.application.sounds.sound.get("rymdsten_sound_body_explode");
};

//--------------------------------------------------------------------------
// Inheritance
//--------------------------------------------------------------------------

rymdsten.entity.Saucer.prototype = Object.create(rymdsten.entity.Body.prototype);
rymdsten.entity.Saucer.prototype.constructor = rymdsten.entity.Saucer;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Fires a bullet.
 *
 * @returns {undefined}
 */
rymdsten.entity.Saucer.prototype.fire = function() {
    if (this.m_saucers != null) {
        if (this.m_saucers.game.ships.numMembers > 0) {
            var bullet = this.m_saucers.bullets.create(this.centerX, this.centerY);
            bullet.velocity.x = (this.m_movement.x == 2) ? this.speed : -this.speed;
            bullet.velocity.y = (this.m_movement.y == 2) ? this.speed : -this.speed;
            var target = this.m_saucers.game.ships.getMemberAt(0);
            bullet.rotation = rune.util.Math.radiansToDegrees(Math.atan2(
                target.centerY - this.centerY,
                target.centerX - this.centerX
            ));
            bullet.rotation += rune.util.Math.random(-this.aiming, this.aiming);
        }
    }
};

/**
 * Move down.
 *
 * @param {number} [step=1000/60] Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.Saucer.prototype.moveDown = function(step) {
    step = step === undefined ? 1000 / 60 : step;
    this.y += this.speed * step / (1000 / 60);
};

/**
 * Move left.
 *
 * @param {number} [step=1000/60] Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.Saucer.prototype.moveLeft = function(step) {
    step = step === undefined ? 1000 / 60 : step;
    this.x -= this.speed * step / (1000 / 60);
};

/**
 * Move right.
 *
 * @param {number} [step=1000/60] Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.Saucer.prototype.moveRight = function(step) {
    step = step === undefined ? 1000 / 60 : step;
    this.x += this.speed * step / (1000 / 60);
};

/**
 * Move up.
 *
 * @param {number} [step=1000/60] Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.Saucer.prototype.moveUp = function(step) {
    step = step === undefined ? 1000 / 60 : step;
    this.y -= this.speed * step / (1000 / 60);
};

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Saucer.prototype.kill = function() {
    rymdsten.entity.Body.prototype.kill.call(this);
    if (this.m_saucers.bullets != null) {
        this.m_saucers.bullets.reset();
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Saucer.prototype.update = function(step) {
    rymdsten.entity.Body.prototype.update.call(this, step);
    this.m_updateMovement(step);
    this.m_updateAttack(step);
    this.m_updateBeat(step);
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Calculate motion.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Saucer.prototype.m_updateMovement = function(step) {
    if (this.targeting > 0) {

        this.m_targeting -= step;

        while (this.m_targeting < -0.000001) {
            this.m_targeting += this.targeting;
            this.m_updateMovementDirections(step);
        }

        if      (this.m_movement.x == 1) this.moveLeft(step);
        else if (this.m_movement.x == 2) this.moveRight(step);

        if      (this.m_movement.y == 1) this.moveUp(step);
        else if (this.m_movement.y == 2) this.moveDown(step);
    }
};

/**
 * Calculate direction.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Saucer.prototype.m_updateMovementDirections = function(step) {
    //@note: Override from child class.
};

/**
 * Calculate attack.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Saucer.prototype.m_updateAttack = function(step) {
    if (this.attack > 0) {

        this.m_attack -= step;

        while (this.m_attack < -0.000001) {
            this.m_attack += this.attack;
            this.fire();
        }
    }
};

/**
 * Play sound.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Saucer.prototype.m_updateBeat = function(step) {
    if (this.beat != null) {
        this.beat.play(false);
    }
};
