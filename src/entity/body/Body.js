//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Sprite
 *
 * @param {number} x Horizontal position in pixels.
 * @param {number} y Vertical position in pixels.
 * @param {number} width Width of the object in pixels.
 * @param {number} height Height of the object in pixels.
 * @param {string} color Background fill color; an empty string leaves the background transparent.
 * @param {string} texture Name of the texture resource.
 *
 * @class
 * @classdesc
 *
 * Represents a physical object.
 */
rymdsten.entity.Body = function(x, y, width, height, color, texture) {

    //--------------------------------------------------------------------------
    // Public properties
    //--------------------------------------------------------------------------

    /**
     * Sound for when the object is removed.
     *
     * @type {rune.media.Sound}
     * @default null
     */
    this.soundKill = null;

    /**
     * Remaining health of the game entity.
     *
     * @type {number}
     * @default 100
     */
    this.health = 100;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rune.display.Sprite.
     */
    rune.display.Sprite.call(this, x, y, width, height, texture);
    this.backgroundColor = color || "";
    this.movable = true;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.entity.Body.prototype = Object.create(rune.display.Sprite.prototype);
rymdsten.entity.Body.prototype.constructor = rymdsten.entity.Body;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Whether the entity has health remaining.
 *
 * @member {boolean} alive
 * @memberof rymdsten.entity.Body
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.entity.Body.prototype, "alive", {
    /**
     * @this rymdsten.entity.Body
     * @ignore
     */
    get : function() {
        return this.health > 0;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Removes the entity from its group and plays its destruction sound.
 *
 * @returns {undefined}
 */
rymdsten.entity.Body.prototype.kill = function() {
    this.health = 0;
    if (this.group != null) {
        this.group.removeMember(this);
    }

    if (this.soundKill != null) {
        this.soundKill.play(true);
    }
};

/**
 * Applies damage and destroys the entity when its health is depleted.
 *
 * @param {number} damage Amount of health to remove.
 *
 * @returns {undefined}
 */
rymdsten.entity.Body.prototype.hurt = function(damage) {
    if (!this.alive) return;
    this.health -= damage;
    if (!this.alive) this.kill();
};

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.entity.Body.prototype.init = function() {
    rune.display.Sprite.prototype.init.call(this);
    this.m_initHitbox();
    this.m_initPhysics();
    this.m_initAnimation();
};

/**
 * @inheritDoc
 */
rymdsten.entity.Body.prototype.update = function(step) {
    rune.display.Sprite.prototype.update.call(this, step);
    this.m_updateBounds(step);
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Declares the physical size of the object.
 *
 * @returns {undefined}
 * @protected
 */
rymdsten.entity.Body.prototype.m_initHitbox = function() {
    //@note: Override from child class.
};

/**
 * Declares the physical conditions of the object.
 *
 * @returns {undefined}
 * @protected
 */
rymdsten.entity.Body.prototype.m_initPhysics = function() {
    this.mass = 1.0;
    this.velocity.max.x = 6.0; //@note: Magic number.
    this.velocity.max.y = 6.0; //@note: Magic number.
};

/**
 * Declares the object's animation.
 *
 * @returns {undefined}
 * @protected
 */
rymdsten.entity.Body.prototype.m_initAnimation = function() {
    //@note: Override from child class.
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Limits the object to within the screen area.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.entity.Body.prototype.m_updateBounds = function(step) {
    var camera = this.application.scenes.selected.cameras.getCameraAt(0);

    // WIDTH
    if (this.left > camera.width) this.right = 0;
    else if (this.right < 0) this.left = camera.width;

    // HEIGHT
    if (this.top > camera.height) this.bottom = 0;
    else if (this.bottom < 0) this.top = camera.height;
};
