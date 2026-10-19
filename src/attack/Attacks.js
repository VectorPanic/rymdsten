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
 * Manages saucer attacks and the delay between enemy spawns.
 */
rymdsten.attack.Attacks = function(game) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Whether saucer attacks are enabled.
     *
     * @type {boolean}
     * @private
     */
    this.m_active = false;

    /**
     * Reference to the game scene.
     *
     * @type {rymdsten.scene.Game}
     * @private
     */
    this.m_game = game;

    /**
     * Handler for the attacking saucers.
     *
     * @type {rymdsten.entity.Saucers}
     * @private
     */
    this.m_saucers = null;

    /**
     * Milliseconds remaining until the next saucer attack.
     *
     * @type {number}
     * @private
     */
    this.m_ticker = 0;

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
 * Managed saucer group.
 *
 * @member {rymdsten.entity.Saucers} saucers
 * @memberof rymdsten.attack.Attacks
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.attack.Attacks.prototype, "saucers", {
    /**
     * @this rymdsten.attack.Attacks
     * @ignore
     */
    get : function() {
        return this.m_saucers;
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Resets the managed objects and prepares them for a new game.
 *
 * @returns {undefined}
 */
rymdsten.attack.Attacks.prototype.reset = function() {
    if (this.m_saucers != null) {
        this.m_saucers.reset();
    }

    this.m_resetTicker();
};

/**
 * Enables saucer attacks and resets the spawn timer.
 *
 * @returns {undefined}
 */
rymdsten.attack.Attacks.prototype.start = function() {
    if (this.m_active != true) {
        this.m_active  = true;
        this.reset();
    }
};

/**
 * Disables new saucer attacks.
 *
 * @returns {undefined}
 */
rymdsten.attack.Attacks.prototype.stop = function() {
    if (this.m_active != false) {
        this.m_active  = false;
    }
};

//------------------------------------------------------------------------------
// Public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * Updates the manager for the current frame.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 */
rymdsten.attack.Attacks.prototype.update = function(step) {
    this.m_updateTicker(step);
};

/**
 * Releases the attack manager and its scene-owned saucer group.
 *
 * @returns {undefined}
 */
rymdsten.attack.Attacks.prototype.dispose = function() {
    this.stop();
    if (this.m_saucers != null) {
        this.m_game.groups.remove(this.m_saucers, true);
        this.m_saucers = null;
    }
    this.m_game = null;
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Constructs the manager and its required subsystems.
 *
 * @returns {undefined}
 * @protected
 */
rymdsten.attack.Attacks.prototype.m_construct = function() {
    this.m_constructSaucers();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates and registers the scene's saucer group.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_constructSaucers = function() {
    this.m_disposeSaucers();
    if (this.m_saucers == null && this.m_game != null) {
        this.m_saucers = this.m_game.groups.add(
            new rymdsten.entity.Saucers(this.m_game)
        );
    } else throw new Error();
};

/**
 * Spawns a saucer when the attack delay and score requirements are met.
 *
 * @param {number} step Elapsed time in milliseconds.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_updateTicker = function(step) {
    if (this.m_active == true && this.m_saucers != null && this.m_game.hud.score > 5000) { //@note: Magic number.
        if (this.m_saucers.numMembers == 0 && this.m_game.ships.numMembers > 0) {
            this.m_ticker -= step;

            if (this.m_ticker < 0) {
                this.m_resetTicker();
                this.m_saucers.create(
                    (rune.util.Math.chance(50)) ? 0 : 1280, //@note: Magic number.
                    rune.util.Math.random(0, 720),          //@note: Magic number.
                    this.m_getType()
                );
            }
        }
    }
};

/**
 * Chooses a new random delay before the next saucer attack.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_resetTicker = function() {
    this.m_ticker = rune.util.Math.randomInt(30000, 45000); //@note: Magic number.
};

/**
 * Disposes the managed saucer group.
 *
 * @returns {undefined}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_disposeSaucers = function() {
    if (this.m_saucers instanceof rymdsten.entity.Saucers) {
        this.m_saucers.dispose();
        this.m_saucers = null;
    }
};

/**
 * Selects the saucer class or size used for the next spawn.
 *
 * @returns {string}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_getType = function() {
    var type = rymdsten.entity.Saucers.LARGE;
    if (this.m_game.hud.score < 40000) { //@note: Magic numbers.
        if (rune.util.Math.chance(20)) { //@note: Magic numbers.
            type = rymdsten.entity.Saucers.SMALL;
        }
    } else {
        type = rymdsten.entity.Saucers.SMALL;
    }

    return type;
};
