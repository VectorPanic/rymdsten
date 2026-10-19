//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rymdsten.scene.Game} game Game scene that owns this manager.
 *
 * @class
 * @classdesc
 *
 * Represents a handler for ships.
 */
rymdsten.entity.Ships = function(game) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Reference to the game scene.
     *
     * @type {rymdsten.scene.Game}
     * @private
     */
    this.m_game = game;

    /**
     * Scene-owned exhaust emitter, reused across respawns.
     *
     * @type {rune.particle.Emitter}
     * @private
     */
    this.m_emitter = null;

    /**
     * Scene-owned debris emitter that remains after a ship is destroyed.
     *
     * @type {rune.particle.Emitter}
     * @private
     */
    this.m_debrisEmitter = null;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rune.display.DisplayGroup.
     */
    rune.display.DisplayGroup.call(this, this.m_game.stage);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Ships.prototype = Object.create(rune.display.DisplayGroup.prototype);
rymdsten.entity.Ships.prototype.constructor = rymdsten.entity.Ships;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Reference to the ship's handler for bullets.
 *
 * @member {rymdsten.entity.Bullets} bullets
 * @memberof rymdsten.entity.Ships
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.entity.Ships.prototype, "bullets", {
    /**
     * @this rymdsten.entity.Ships
     * @ignore
     */
    get : function() {
        return this.m_bullets;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Creates a new ship at a specific position.
 *
 * @param {number} [x=0] Horizontal position in pixels.
 * @param {number} [y=0] Vertical position in pixels.
 *
 * @returns {undefined}
 */
rymdsten.entity.Ships.prototype.create = function(x, y) {
    if (this.numMembers == 0) {
        var ship = new rymdsten.entity.Ship(this);
        ship.centerX = x;
        ship.centerY = y;
        ship.flicker.start(1000, 60); //@note: Magic numbers.

        this.addMember(ship);
    }
};

/**
 * Resets all ships.
 *
 * @returns {undefined}
 */
rymdsten.entity.Ships.prototype.reset = function() {
    if (this.m_emitter != null) this.m_emitter.clear();
    if (this.m_debrisEmitter != null) this.m_debrisEmitter.clear();
    if (this.m_bullets) {
        this.m_bullets.removeMembers();
    }

    this.removeMembers();
};

/**
 * Emits exhaust behind the rotated ship with its inherited velocity.
 *
 * @param {rymdsten.entity.Ship} ship Ship supplying the emission position and velocity.
 *
 * @returns {undefined}
 */
rymdsten.entity.Ships.prototype.emitSparks = function(ship) {
    var angle = rune.util.Math.degreesToRadians(ship.rotation);
    var distance = 4; // Exhaust origin, in pixels behind the ship center.
    this.m_emitter.centerX = ship.centerX - Math.cos(angle) * distance;
    this.m_emitter.centerY = ship.centerY - Math.sin(angle) * distance;
    this.m_emitter.rotation = ship.rotation;
    this.m_emitter.velocity.x = ship.velocity.x;
    this.m_emitter.velocity.y = ship.velocity.y;
    this.m_emitter.emit(2);
};

/**
 * Emits ship fragments at the destruction position with inherited velocity.
 *
 * @param {rymdsten.entity.Ship} ship Ship supplying the emission position and velocity.
 *
 * @returns {undefined}
 */
rymdsten.entity.Ships.prototype.emitDebris = function(ship) {
    this.m_debrisEmitter.centerX = ship.centerX;
    this.m_debrisEmitter.centerY = ship.centerY;
    this.m_debrisEmitter.velocity.x = ship.velocity.x;
    this.m_debrisEmitter.velocity.y = ship.velocity.y;
    this.m_debrisEmitter.emit(12);
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Ships.prototype.init = function() {
    rune.display.DisplayGroup.prototype.init.call(this);
    this.m_initBullets();
    this.m_emitter = new rune.particle.Emitter(8, 0, 0, 0, {
        capacity: 48,
        minLifespan: 180,
        maxLifespan: 360,
        minRotation: -8,
        maxRotation: 8,
        particles: [rymdsten.entity.ThrustSpark]
    });
    this.m_game.stage.addChild(this.m_emitter);
    this.m_debrisEmitter = new rune.particle.Emitter(0, 0, 0, 0, {
        capacity: 64,
        minLifespan: 800,
        maxLifespan: 1600,
        minRotation: -8,
        maxRotation: 8,
        dragX: 0.01,
        dragY: 0.01,
        particles: [rymdsten.entity.ShipDebris]
    });
    this.m_game.stage.addChild(this.m_debrisEmitter);
};

/**
 * @inheritDoc
 */
rymdsten.entity.Ships.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
    this.m_updateCollision(step);
};

/**
 * @inheritDoc
 */
rymdsten.entity.Ships.prototype.dispose = function() {
    if (this.m_debrisEmitter != null) {
        this.m_debrisEmitter.dispose();
        this.m_debrisEmitter = null;
    }
    if (this.m_emitter != null) {
        this.m_emitter.dispose();
        this.m_emitter = null;
    }
    this.m_disposeBullets();
    rune.display.DisplayGroup.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Creates the handler for bullets.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_initBullets = function() {
    this.m_disposeBullets();
    if (this.m_bullets == null) {
        this.m_bullets = new rymdsten.entity.Bullets(
            this.m_game.stage
        );
    }
};

/**
 * Checks whether a ship collides with other game objects.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_updateCollision = function(step) {

    // ASTEROIDS
    this.hitTestGroup(
        this.m_game.waves.asteroids,
        this.m_onAsteroidCollision,
        this
    );

    // SAUCER
    this.hitTestGroup(
        this.m_game.attacks.saucers,
        this.m_onSaucerCollision,
        this
    );

    // SAUCER BULLETS
    this.hitTestGroup(
        this.m_game.attacks.saucers.bullets,
        this.m_onSaucerBulletCollision,
        this
    );
};

/**
 * Remove the bullet handler.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_disposeBullets = function() {
    if (this.m_bullets instanceof rymdsten.entity.Bullets) {
        this.m_bullets.dispose();
        this.m_bullets = null;
    }
};

/**
 * Handles a ship colliding with an asteroid.
 *
 * @param {rymdsten.entity.Ship} ship Player ship involved in the collision.
 * @param {rymdsten.entity.Asteroid} asteroid Asteroid involved in the collision.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_onAsteroidCollision = function(ship, asteroid) {
    if (ship.flicker.active == false) {
        ship.kill();
    }
};

/**
 * Handles a ship colliding with a saucer.
 *
 * @param {rymdsten.entity.Ship} ship Player ship involved in the collision.
 * @param {rymdsten.entity.Saucer} saucer Saucer involved in the collision.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_onSaucerCollision = function(ship, saucer) {
    if (ship.flicker.active == false) {
        ship.kill();
    }

    if (saucer.flicker.active == false) {
        saucer.kill();
    }
};

/**
 * Handles a ship colliding with a bullet.
 *
 * @param {rymdsten.entity.Ship} ship Player ship involved in the collision.
 * @param {rymdsten.entity.Bullet} bullet Bullet involved in the collision.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_onSaucerBulletCollision = function(ship, bullet) {
    if (ship.flicker.active == false) {
        ship.kill();
    }

    if (bullet.group != null) {
        bullet.group.removeMember(bullet);
    }
};
