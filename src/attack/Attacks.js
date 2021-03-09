//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @param {rymdsten.scene.Game} game ...
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rymdsten.attack.Attacks = function(game) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * ...
     *
     * @type {boolean}
     * @private
     */
    this.m_active = false;
    
    /**
     * ...
     *
     * @type {rymdsten.entity.Asteroids}
     * @private
     */
    this.m_game = game;
    
    /**
     * ...
     *
     * @type {rymdsten.entity.Saucers}
     * @private
     */
    this.m_saucers = null;
    
    /**
     * ...
     *
     * @type {number}
     * @private
     */
    this.m_ticker = 0;
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * ...
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
 * ...
 * 
 * @return {undefined}
 */
rymdsten.attack.Attacks.prototype.reset = function() {
    if (this.m_saucers != null) {
        this.m_saucers.reset();
    }
    
    this.m_resetTicker();
};

/**
 * ...
 * 
 * @return {undefined}
 */
rymdsten.attack.Attacks.prototype.start = function() {
    if (this.m_active != true) {
        this.m_active  = true;
        this.reset();
    }
};

/**
 * ...
 * 
 * @return {undefined}
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
 * ...
 *
 * @param {number} step ...
 * 
 * @return {undefined}
 */
rymdsten.attack.Attacks.prototype.update = function(step) {
    this.m_updateTicker(step);
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 *
 * @return {undefined}
 * @protected
 */
rymdsten.attack.Attacks.prototype.m_construct = function() {
    this.m_constructSaucers();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * ...
 * 
 * @return {undefined}
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
 * ...
 *
 * @param {number} step ...
 * 
 * @return {undefined}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_updateTicker = function(step) {
    if (this.m_active == true && this.m_saucers != null && this.m_game.hud.score > 5000) { //@note: Magic number.
        if (this.m_saucers.numChildren == 0 && this.m_game.ships.numChildren > 0) {
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
 * ...
 * 
 * @return {undefined}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_resetTicker = function() {
    this.m_ticker = rune.util.Math.randomInt(30000, 45000); //@note: Magic number.
};

/**
 * ...
 * 
 * @return {undefined}
 * @private
 */
rymdsten.attack.Attacks.prototype.m_disposeSaucers = function() {
    if (this.m_saucers instanceof rymdsten.entity.Saucers) {
        this.m_saucers.dispose();
        this.m_saucers = null;
    }
};

/**
 * ...
 * 
 * @return {undefined}
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