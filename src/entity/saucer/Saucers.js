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
 * Represents a manager for saucers.
 */
rymdsten.entity.Saucers = function(game) {

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
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     *  Extend rune.display.DisplayGroup.
     */
    rune.display.DisplayGroup.call(this, this.m_game.stage);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Saucers.prototype = Object.create(rune.display.DisplayGroup.prototype);
rymdsten.entity.Saucers.prototype.constructor = rymdsten.entity.Saucers;

//------------------------------------------------------------------------------
// Public static constants
//------------------------------------------------------------------------------

/**
 * Identifier for small saucers.
 *
 * @const {string}
 */
rymdsten.entity.Saucers.SMALL = "small";

/**
 * Identifier for large saucers.
 *
 * @const {string}
 */
rymdsten.entity.Saucers.LARGE = "large";

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Bullet group associated with these objects.
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
 * Game scene that owns this group.
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
 * Creates a game object at the requested position.
 *
 * @param {number} [x=0] Horizontal position in pixels.
 * @param {number} [y=0] Vertical position in pixels.
 * @param {string} [type="large"] Size identifier of the object to create.
 *
 * @returns {undefined}
 */
rymdsten.entity.Saucers.prototype.create = function(x, y, type) {
    if (this.numMembers == 0) {
        var Saucer = this.m_getType(type);
        var saucer = new Saucer(this);
        saucer.centerX = x;
        saucer.centerY = y;
        saucer.flicker.start(1000, 60); //@note: Magic numbers.

        this.addMember(saucer);
    }
};

/**
 * Resets the managed objects and prepares them for a new game.
 *
 * @returns {undefined}
 */
rymdsten.entity.Saucers.prototype.reset = function() {
    if (this.m_bullets) {
        this.m_bullets.removeMembers();
    }

    this.removeMembers();
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
 * @returns {undefined}
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
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
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
 * @returns {undefined}
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
 * @param {rymdsten.entity.Saucer} saucer Saucer involved in the collision.
 * @param {rymdsten.entity.Asteroid} asteroid Asteroid involved in the collision.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_onAsteroidCollision = function(saucer, asteroid) {
    if (saucer.flicker.active == false) {
        saucer.kill();
    }
};

/**
 * When a saucer collides with a bullet from the ship.
 *
 * @param {rymdsten.entity.Saucer} saucer Saucer involved in the collision.
 * @param {rymdsten.entity.Bullet} bullet Bullet involved in the collision.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_onBulletCollision = function(saucer, bullet) {
    if (saucer.flicker.active == false) {
        saucer.kill();

        this.m_game.hud.score += saucer.score;

        if (bullet.group != null) {
            bullet.group.removeMember(bullet);
        }
    }
};

/**
 * Returns the type of saucer, based on string value.
 *
 * @param {string} type Size identifier of the object to create.
 *
 * @returns {Function}
 * @private
 */
rymdsten.entity.Saucers.prototype.m_getType = function(type) {
    if (type == rymdsten.entity.Saucers.SMALL) {
        return rymdsten.entity.SaucerSmall;
    }

    return rymdsten.entity.SaucerLarge;
};
