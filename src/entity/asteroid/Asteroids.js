//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayGroup
 *
 * @param {rymdsten.scene.Game} game ...
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
     * ...
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
 * @param {number} x ...
 * @param {number} y ...
 * @param {string} [type] ...
 *
 * @return {undefined}
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

    this.addChild(asteroid);
};

/**
 * Resets all asteroids.
 *
 * @return {undefined}
 */
rymdsten.entity.Asteroids.prototype.reset = function() {
    this.removeChildren(true);
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
 * @param {number} step ...
 *
 * @return {undefined}
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
 * @param {rymdsten.entity.Bullet} bullet ...
 * @param {rymdsten.entity.Asteroid} asteroid ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Asteroids.prototype.m_onShipBulletCollision = function(bullet, asteroid) {
    this.m_onSaucerBulletCollision(bullet, asteroid);
    if (asteroid.alive == false) {
        this.m_game.hud.score += asteroid.score;
    }
};

/**
 * When an asteroid collides with a bullet from a saucer.
 *
 * @param {rymdsten.entity.Bullet} bullet ...
 * @param {rymdsten.entity.Asteroid} asteroid ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Asteroids.prototype.m_onSaucerBulletCollision = function(bullet, asteroid) {
    asteroid.velocity.add(bullet.velocity);
    asteroid.velocity.divide(asteroid.mass * 2);
    asteroid.hurt(bullet.damage);
    if (bullet.group != null) {
        bullet.group.removeChild(bullet);
    }
};