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
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 *
 * @return {undefined}
 */
rymdsten.entity.Ships.prototype.create = function(x, y) {
    if (this.numChildren == 0) {
        var ship = new rymdsten.entity.Ship(this);
            ship.centerX = x;
            ship.centerY = y;
            ship.flicker(1000, 60); //@note: Magic numbers.
            
        this.addChild(ship);   
    }
};

/**
 * Resets all ships.
 *
 * @return {undefined}
 */
rymdsten.entity.Ships.prototype.reset = function() {
    if (this.m_bullets) {
        this.m_bullets.removeChildren();
    }
    
    this.removeChildren();
};

//------------------------------------------------------------------------------
// Override Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Ships.prototype.init = function() {
    rune.display.DisplayGroup.prototype.init.call(this);
    this.m_initBullets();
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
    this.m_disposeBullets();
    rune.display.DisplayGroup.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Creates the handler for bullets.
 *
 * @return {undefined}
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
 * @param {number} step ...
 *
 * @return {undefined}
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
 * @return {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_disposeBullets = function() {
    if (this.m_bullets instanceof rymdsten.entity.Bullets) {
        this.m_bullets.dispose();
        this.m_bullets = null;
    }
};

/**
 * Then a ship collides with an asteroid.
 *
 * @param {rymdsten.entity.Asteroid} asteroid ...
 * @param {rymdsten.entity.Ship} ship ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_onAsteroidCollision = function(asteroid, ship) {
    if (ship.flickering == false) {
        ship.kill();
    }
};

/**
 * Then a ship collides with a saucer.
 *
 * @param {rymdsten.entity.Asteroid} asteroid ...
 * @param {rymdsten.entity.Ship} ship ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_onSaucerCollision = function(saucer, ship) {
    if (ship.flickering == false) {
        ship.kill();
    }
    
    if (saucer.flickering == false) {
        saucer.kill();
    }
};

/**
 * Then a ship collides with a bullet.
 *
 * @param {rymdsten.entity.Bullet} bullet ...
 * @param {rymdsten.entity.Ship} ship ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Ships.prototype.m_onSaucerBulletCollision = function(bullet, ship) {
    if (ship.flickering == false) {
        ship.kill();
    }
    
    if (bullet.group != null) {
        bullet.group.removeChild(bullet);
    }
};