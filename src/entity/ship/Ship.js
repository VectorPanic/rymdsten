//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Body
 *
 * @param {rymdsten.entity.Ships} ships Group that owns the ship.
 *
 * @class
 * @classdesc
 *
 * Represents a ship.
 */
rymdsten.entity.Ship = function(ships) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Handles input.
     *
     * @type {rymdsten.util.Controls}
     * @private
     */
    this.m_controls = new rymdsten.util.Controls();

    /**
     * Reference to the ship's handler.
     *
     * @type {rymdsten.entity.Ships}
     * @private
     */
    this.m_ships = ships;

    /**
     * The ship's thrust sound.
     *
     * @type {rune.media.Sound}
     * @private
     */
    this.m_soundThrust = this.application.sounds.sound.get("rymdsten_sound_ship_thrust");

    /**
     * Rotation in degrees per 60 Hz reference step.
     *
     * @type {number}
     * @private
     */
    this.m_spin = 5;

    /**
     * Velocity added by thrust per 60 Hz reference step.
     *
     * @type {number}
     * @private
     */
    this.m_thrust = 0.05;

    /**
     * Milliseconds until the next engine spark emission.
     *
     * @type {number}
     * @private
     */
    this.m_sparkRemaining = 0;

    /**
     * Milliseconds until the next engine vibration pulse.
     *
     * @type {number}
     * @private
     */
    this.m_thrustVibrationRemaining = 0;

    /**
     * Whether engine vibration must stop when thrust is released.
     *
     * @type {boolean}
     * @private
     */
    this.m_thrustVibrating = false;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rymdsten.entity.Body.
     */
    rymdsten.entity.Body.call(this, 0, 0, 30, 18, "", "rymdsten_texture_ship_30x18");

    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------

    /**
     * @inheritDoc
     */
    this.soundKill = this.application.sounds.sound.get("rymdsten_sound_body_explode");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Ship.prototype = Object.create(rymdsten.entity.Body.prototype);
rymdsten.entity.Ship.prototype.constructor = rymdsten.entity.Ship;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Fires from the rotated ship nose, inheriting the ship's velocity.
 *
 * @returns {undefined}
 */
rymdsten.entity.Ship.prototype.fire = function() {
    if (this.m_ships != null) {
        var angle = rune.util.Math.degreesToRadians(this.rotation);
        var distance = this.width / 2 + 4;
        var bullet = this.m_ships.bullets.create(
            this.centerX + Math.cos(angle) * distance,
            this.centerY + Math.sin(angle) * distance
        );
        bullet.velocity.x = this.velocity.x;
        bullet.velocity.y = this.velocity.y;
        bullet.rotation = this.rotation;
    }
};

/**
 * Enter hyperspace.
 *
 * @returns {undefined}
 */
rymdsten.entity.Ship.prototype.hyperspace = function() {
    this.x = rune.util.Math.random(20, this.application.scenes.selected.cameras.getCameraAt(0).width  - 20);
    this.y = rune.util.Math.random(20, this.application.scenes.selected.cameras.getCameraAt(0).height - 20);
    this.rotation = rune.util.Math.random(0, 360);
    this.flicker.start(1000, 60);
};

/**
 * Applies thrust, emits engine sparks and pulses the gamepad motors.
 *
 * @param {number} [step=1000/60] Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.entity.Ship.prototype.thrust = function(step) {
    step = step === undefined ? 1000 / 60 : step;
    if (step <= 0) return;
    var scale = step / (1000 / 60);
    this.velocity.x += rune.util.Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_thrust * scale;
    this.velocity.y += rune.util.Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_thrust * scale;
    this.animation.gotoAndPlay("thrust");
    this.m_soundThrust.play(false);
    // Keep the 60 FPS exhaust density, preserving fractional elapsed time.
    this.m_sparkRemaining -= step;
    while (this.m_sparkRemaining < -0.000001) {
        this.m_ships.emitSparks(this);
        this.m_sparkRemaining += 1000 / 30;
    }
    this.m_thrustVibrationRemaining -= step;
    if (this.m_thrustVibrationRemaining < -0.000001 || !this.m_thrustVibrating) {
        this.m_controls.vibrate(120, 0.2, 0.1);
        // Renew one effect; missed pulses should not restart the actuator repeatedly.
        this.m_thrustVibrationRemaining += 80 * Math.max(
            1, Math.ceil(-this.m_thrustVibrationRemaining / 80)
        );
        this.m_thrustVibrating = true;
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Ship.prototype.kill = function() {
    if (this.group != null) this.m_ships.emitDebris(this);
    this.m_controls.vibrate(450, 0.7, 1.0);
    this.m_thrustVibrating = false;
    this.m_thrustVibrationRemaining = 0;
    rymdsten.entity.Body.prototype.kill.call(this);
    if (this.m_ships.bullets != null) {
        this.m_ships.bullets.reset();
    }
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Ship.prototype.update = function(step) {
    rymdsten.entity.Body.prototype.update.call(this, step);
    this.m_updateInput(step);
};

//------------------------------------------------------------------------------
// Override protected prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Ship.prototype.m_initHitbox = function() {
    this.hitbox.set(
        5,
        4,
        20,
        10
    );
};

/**
 * @inheritDoc
 */
rymdsten.entity.Ship.prototype.m_initAnimation = function() {
    rymdsten.entity.Body.prototype.m_initAnimation.call(this);
    this.animation.create("idle",   [0   ], 0,  false);
    this.animation.create("thrust", [1, 2], 15, false, null);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Handles input to control the ship.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Ship.prototype.m_updateInput = function(step) {
    var scale = step / (1000 / 60);

    // THRUST
    if (this.m_controls.up) {
        this.thrust(step);
    } else {
        this.animation.gotoAndPlay("idle");
        this.m_sparkRemaining = 0;
        if (this.m_thrustVibrating) {
            this.m_controls.vibrate(0);
            this.m_thrustVibrating = false;
            this.m_thrustVibrationRemaining = 0;
        }
    }

    // SPIN
    if (this.m_controls.left) {
        this.rotation -= this.m_spin * scale;
    } else if (this.m_controls.right) {
        this.rotation += this.m_spin * scale;
    }

    // FIRE
    if (this.m_controls.fire) {
        this.fire();
    }

    // HYPERSPACE
    if (this.m_controls.hyperspace) {
        this.glitch.start(1000, 10);
        this.hyperspace();
    }
};
