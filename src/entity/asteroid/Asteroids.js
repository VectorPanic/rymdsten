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
 * Represents a handler responsible for asteroids.
 */
rymdsten.entity.Asteroids = function(game) {

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

rymdsten.entity.Asteroids.prototype = Object.create(rune.display.DisplayGroup.prototype);
rymdsten.entity.Asteroids.prototype.constructor = rymdsten.entity.Asteroids;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * Small asteroid.
 *
 * @const {string}
 */
rymdsten.entity.Asteroids.SMALL = "small";

/**
 * Medium asteroid.
 *
 * @const {string}
 */
rymdsten.entity.Asteroids.MEDIUM = "medium";

/**
 * Large asteroid.
 *
 * @const {string}
 */
rymdsten.entity.Asteroids.LARGE = "large";

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Create a small, medium or large asteroid, in a certain position.
 *
 * @param {number} x Horizontal position in pixels.
 * @param {number} y Vertical position in pixels.
 * @param {string} [type] Size identifier of the object to create.
 *
 * @returns {undefined}
 */
rymdsten.entity.Asteroids.prototype.create = function(x, y, type) {
    var asteroid;
    switch (type.toLowerCase()) {
        case rymdsten.entity.Asteroids.SMALL: {
            asteroid = new rymdsten.entity.AsteroidSmall();
            break;
        }
        case rymdsten.entity.Asteroids.LARGE: {
            asteroid = new rymdsten.entity.AsteroidLarge();
            break;
        }
        default: {
            asteroid = new rymdsten.entity.AsteroidMedium();
            break;
        }
    }

    asteroid.centerX = x;
    asteroid.centerY = y;

    this.addMember(asteroid);
};

/**
 * Resets all asteroids.
 *
 * @returns {undefined}
 */
rymdsten.entity.Asteroids.prototype.reset = function() {
    this.removeMembers(true);
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Asteroids.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
    this.m_updateCollision(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Check if an asteroid collides with a game object.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Asteroids.prototype.m_updateCollision = function(step) {

    // SHIP BULLETS
    this.hitTestGroup(
        this.m_game.ships.bullets,
        this.m_onShipBulletCollision,
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
 * When an asteroid collides with a bullet from the ship.
 *
 * @param {rymdsten.entity.Asteroid} asteroid Asteroid involved in the collision.
 * @param {rymdsten.entity.Bullet} bullet Bullet involved in the collision.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Asteroids.prototype.m_onShipBulletCollision = function(asteroid, bullet) {
    this.m_onSaucerBulletCollision(asteroid, bullet);
    if (asteroid.alive == false) {
        this.m_game.hud.score += asteroid.score;
    }
};

/**
 * When an asteroid collides with a bullet from a saucer.
 *
 * @param {rymdsten.entity.Asteroid} asteroid Asteroid involved in the collision.
 * @param {rymdsten.entity.Bullet} bullet Bullet involved in the collision.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Asteroids.prototype.m_onSaucerBulletCollision = function(asteroid, bullet) {
    asteroid.velocity.add(bullet.velocity);
    asteroid.velocity.divide(asteroid.mass * 2);
    asteroid.hurt(bullet.damage);
    if (bullet.group != null) {
        bullet.group.removeMember(bullet);
    }
};
