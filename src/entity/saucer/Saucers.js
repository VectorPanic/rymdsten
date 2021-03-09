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
 * Represents a manager for saucers.
 */
rymdsten.entity.Saucers = function(game) {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * ...
     *
     * @type {rymdsten.scene.Game}
     * @private
     */
    this.m_game = game;

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.display.DisplayGroup.call(this, this.m_game.stage);
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Saucers.prototype = Object.create(rune.display.DisplayGroup.prototype);
rymdsten.entity.Saucers.prototype.constructor = rymdsten.entity.Saucers;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @const {string}
 */
rymdsten.entity.Saucers.SMALL = "small";

/**
 * ...
 *
 * @const {string}
 */
rymdsten.entity.Saucers.LARGE = "large";

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @member {rymdsten.entity.Bullets} bullets
 * @memberof rymdsten.entity.Saucers
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.entity.Saucers.prototype, "bullets", {
    /**
     * @this rymdsten.entity.Saucers
     * @ignore
     */
    get : function() {
        return this.m_bullets;
    }
});

/**
 * ...
 *
 * @member {rymdsten.scene.Game} game
 * @memberof rymdsten.entity.Saucers
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.entity.Saucers.prototype, "game", {
    /**
     * @this rymdsten.entity.Saucers
     * @ignore
     */
    get : function() {
        return this.m_game;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @param {number} [x=0] ...
 * @param {number} [y=0] ...
 * @param {string} [type="large"] ...
 *
 * @return {undefined}
 */
rymdsten.entity.Saucers.prototype.create = function(x, y, type) {
    if (this.numChildren == 0) {
        var Saucer = this.m_getType(type);
        var saucer = new Saucer(this);
            saucer.centerX = x;
            saucer.centerY = y;
            saucer.flicker(1000, 60); //@note: Magic numbers.
            
        this.addChild(saucer);
    }
};

/**
 * ...
 *
 * @return {undefined}
 */
rymdsten.entity.Saucers.prototype.reset = function() {
    if (this.m_bullets) {
        this.m_bullets.removeChildren();
    }
    
    this.removeChildren();
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Saucers.prototype.init = function() {
    rune.display.DisplayGroup.prototype.init.call(this);
    this.m_initBullets();
};

/**
 * @inheritDoc
 */
rymdsten.entity.Saucers.prototype.update = function(step) {
    rune.display.DisplayGroup.prototype.update.call(this, step);
    this.m_updateCollision(step);
};

/**
 * @inheritDoc
 */
rymdsten.entity.Saucers.prototype.dispose = function() {
    this.m_disposeBullets();
    rune.display.DisplayGroup.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates the handler for bullets.
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_initBullets = function() {
    this.m_disposeBullets();
    if (this.m_bullets == null) {
        this.m_bullets = new rymdsten.entity.Bullets(
            this.m_game.stage
        );
    }
};

/**
 * Controls collision between saucers and other game objects.
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_updateCollision = function(step) {
    
    // ASTEROIDS
    this.hitTestGroup(
        this.m_game.waves.asteroids,
        this.m_onAsteroidCollision,
        this
    );
    
    // SHIP BULLETS
    this.hitTestGroup(
        this.m_game.ships.bullets,
        this.m_onBulletCollision,
        this
    );
};

/**
 * Remove the bullet handler.
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_disposeBullets = function() {
    if (this.m_bullets instanceof rymdsten.entity.Bullets) {
        this.m_bullets.dispose();
        this.m_bullets = null;
    }
};

/**
 * When a saucer collides with an asteroid.
 *
 * @param {rymdsten.entity.Asteroid} asteroid ...
 * @param {rymdsten.entity.Saucer} saucer ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_onAsteroidCollision = function(asteroid, saucer) {
    if (saucer.flickering == false) {
        saucer.kill();
    }
};

/**
 * When a saucer collides with a bullet from the ship.
 *
 * @param {rymdsten.entity.Bullet} bullet ...
 * @param {rymdsten.entity.Saucer} saucer ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_onBulletCollision = function(bullet, saucer) {
    if (saucer.flickering == false) {
        saucer.kill();
        
        this.m_game.hud.score += saucer.score;
        
        if (bullet.group != null) {
            bullet.group.removeChild(bullet);
        }
    }
};

/**
 * Returns the type of saucer, based on string value.
 *
 * @param {string} type ...
 *
 * @return {Function}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_getType = function(type) {
    if (type == rymdsten.entity.Saucers.SMALL) {
        return rymdsten.entity.SaucerSmall;
    }
    
    return rymdsten.entity.SaucerLarge;
};