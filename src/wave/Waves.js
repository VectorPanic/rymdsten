//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @param {rymdsten.scene.Game} game Game scene that owns this manager.
 *
 * @class
 * @classdesc
 *
 * Represents a wave handler.
 */
rymdsten.wave.Waves = function(game) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Reference to the asteroid handler.
     *
     * @type {rymdsten.entity.Asteroids}
     * @private
     */
    this.m_asteroids = null;

    /**
     * Current wave index.
     *
     * @type {number}
     * @private
     */
    this.m_current = -1;

    /**
     * Reference to the game scene.
     *
     * @type {rymdsten.scene.Game}
     * @private
     */
    this.m_game = game;

    /**
     * List of waves (Wave).
     *
     * @type {Array.<rymdsten.wave.Wave>}
     * @private
     */
    this.m_waves = [];

    /**
     * Positions where asteroids can be created.
     *
     * @type {rune.geom.Point}
     */
    this.m_spawnPoint = new rune.geom.Point();

    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * Construct the required subsystems.
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Reference to the asteroid handler.
 *
 * @member {rymdsten.entity.Asteroids} asteroids
 * @memberof rymdsten.wave.Waves
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.wave.Waves.prototype, "asteroids", {
    /**
     * @this rymdsten.wave.Waves
     * @ignore
     */
    get : function() {
        return this.m_asteroids;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Add new wave.
 *
 * @param {rymdsten.wave.Wave} wave Wave definition to append.
 *
 * @throws {TypeError} If the argument is not a wave definition.
 *
 * @returns {undefined}
 */
rymdsten.wave.Waves.prototype.add = function(wave) {
    if (wave instanceof rymdsten.wave.Wave) {
        this.m_waves.push(wave);
    } else throw new TypeError();
};

/**
 * Load a wave.
 *
 * @param {number} index Zero-based index of the wave to load.
 *
 * @returns {undefined}
 */
rymdsten.wave.Waves.prototype.load = function(index) {
    this.reset();
    this.m_current = rune.util.Math.clamp(index, 0, this.m_waves.length - 1);
    this.m_loadAsteroids();
};

/**
 * Skip to next wave.
 *
 * @returns {undefined}
 */
rymdsten.wave.Waves.prototype.next = function() {
    this.m_current++;
    if (this.m_current >= this.m_waves.length) {
        this.m_current = 0;
    }

    this.m_loadAsteroids();
};

/**
 * Go to previous wave.
 *
 * @returns {undefined}
 */
rymdsten.wave.Waves.prototype.previous = function() {
    this.m_current--;
    if (this.m_current < 0) {
        this.m_current = this.m_waves.length - 1;
    }

    this.m_loadAsteroids();
};

/**
 * Reset wave.
 *
 * @returns {undefined}
 */
rymdsten.wave.Waves.prototype.reset = function() {
    this.m_current = -1;
    if (this.m_asteroids) {
        this.m_asteroids.removeMembers();
    }
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Update waves.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.wave.Waves.prototype.update = function(step) {
    this.m_updateWave(step);
};

/**
 * Releases the wave definitions, spawn point and scene-owned asteroid group.
 *
 * @returns {undefined}
 */
rymdsten.wave.Waves.prototype.dispose = function() {
    if (this.m_asteroids != null) {
        this.m_game.groups.remove(this.m_asteroids, true);
        this.m_asteroids = null;
    }
    this.m_waves = [];
    this.m_spawnPoint = null;
    this.m_game = null;
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Class constructor.
 *
 * @returns {undefined}
 * @protected
 */
rymdsten.wave.Waves.prototype.m_construct = function() {
    this.m_constructAsteroids();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates the handler for asteroids.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.wave.Waves.prototype.m_constructAsteroids = function() {
    this.m_disposeAsteroids();
    if (this.m_asteroids == null && this.m_game != null) {
        this.m_asteroids = this.m_game.groups.add(
            new rymdsten.entity.Asteroids(this.m_game)
        );
    } else throw new Error();
};

/**
 * Check whether the next wave should start.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.wave.Waves.prototype.m_updateWave = function(step) {
    if (this.m_asteroids.numMembers == 0 && this.m_current != -1) {
        if (this.m_game.attacks.saucers.numMembers == 0) {
            this.m_game.attacks.reset();
            this.next();
        }
    }
};

/**
 * Remove the asteroid handler.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.wave.Waves.prototype.m_disposeAsteroids = function() {
    if (this.m_asteroids instanceof rymdsten.entity.Asteroids) {
        this.m_asteroids.dispose();
        this.m_asteroids = null;
    }
};

/**
 * Load asteroids in current wave.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.wave.Waves.prototype.m_loadAsteroids = function() {
    this.m_asteroids.removeMembers(true);
    for (var i = 0; i < this.m_waves[this.m_current].m_asteroids.length; i++) {
        this.m_updateSpawnPoint();
        this.m_asteroids.create(this.m_spawnPoint.x, this.m_spawnPoint.y, this.m_waves[this.m_current].m_asteroids[i]);
    }
};

/**
 * Set random spawn point.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.wave.Waves.prototype.m_updateSpawnPoint = function() {
    var w = rune.system.Application.instance.screen.width;
    var h = rune.system.Application.instance.screen.height;

    if (rune.util.Math.chance(50)) {
        this.m_spawnPoint.y = (rune.util.Math.chance(50)) ? 0 : h;
        this.m_spawnPoint.x = rune.util.Math.random(0, w);
    } else {
        this.m_spawnPoint.x = (rune.util.Math.chance(50)) ? 0 : w;
        this.m_spawnPoint.y = rune.util.Math.random(0, h);
    }
};
