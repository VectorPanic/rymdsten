//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.entity.Body
 *
 * @param {rymdsten.entity.Ships} ships ...
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
     * Speed for rotation.
     *
     * @type {number}
     * @private
     */
    this.m_spin = 5;
    
    /**
     * Speed for thrust.
     *
     * @type {number}
     * @private
     */
    this.m_thrust = 0.05;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
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
 * Fires a bullet.
 *
 * @return {undefined}
 */
rymdsten.entity.Ship.prototype.fire = function() {
    if (this.m_ships != null) {
        var bullet = this.m_ships.bullets.create(this.centerX, this.centerY);
            bullet.velocity.x = this.velocity.x;
            bullet.velocity.y = this.velocity.y;
            bullet.rotation = this.rotation;
    }
};

/**
 * Enter hyperspace.
 *
 * @return {undefined}
 */
rymdsten.entity.Ship.prototype.hyperspace = function() {
    this.x = rune.util.Math.random(20, this.cameras.getCamera(0).width  - 20);
    this.y = rune.util.Math.random(20, this.cameras.getCamera(0).height - 20);
    this.rotation = rune.util.Math.random(0, 360);
    this.flicker(1000, 60);
};

/**
 * Thrust.
 *
 * @return {undefined}
 */
rymdsten.entity.Ship.prototype.thrust = function() {
    this.velocity.x += rune.util.Math.cos(rune.util.Math.degreesToRadians(this.rotation)) * this.m_thrust;
    this.velocity.y += rune.util.Math.sin(rune.util.Math.degreesToRadians(this.rotation)) * this.m_thrust;
    this.animations.gotoAndPlay("thrust");
    this.m_soundThrust.play(false);
};

//------------------------------------------------------------------------------
// Override public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Ship.prototype.kill = function() {
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
    this.m_updateInput();
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
    rymdsten.entity.Body.prototype.m_initAnimation(this);
    this.animations.add("idle",   [0   ], 0,  false, null);
    this.animations.add("thrust", [1, 2], 15, false, null);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Handles input to control the ship.
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Ship.prototype.m_updateInput = function(step) {

    // THRUST
    if (this.m_controls.up) {
        this.thrust();
    } else {
        this.animations.gotoAndPlay("idle");
    }

    // SPIN
    if (this.m_controls.left) {
        this.rotation -= this.m_spin;
    } else if (this.m_controls.right) {
        this.rotation += this.m_spin;
    }

    // FIRE
    if (this.m_controls.fire) {
        this.fire();
    }

    // HYPERSPACE
    if (this.m_controls.hyperspace) {
        this.hyperspace();
    }
};