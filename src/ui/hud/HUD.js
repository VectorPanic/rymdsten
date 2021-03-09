//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.DisplayObjectContainer
 *
 * @class
 * @classdesc
 * 
 * The HUD.
 */
rymdsten.ui.HUD = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * Copyright text.
     *
     * @type {rymdsten.ui.Copyright}
     * @private
     */
    this.m_copyright = null;
    
    /**
     * Number of extra lives.
     *
     * @type {number}
     * @private
     */
    this.m_extraLifeCounter = 0;
    
    /**
     * Highscore handler.
     *
     * @type {rune.ui.Highscore}
     * @private
     */
    this.m_highscore = null;

    /**
     * Lives manager.
     *
     * @type {rymdsten.ui.Lives}
     * @private
     */
    this.m_lives = null;

    /**
     * Score handler.
     *
     * @type {rymdsten.ui.Score}
     * @private
     */
    this.m_score = null;
    
    /**
     * Sound FX for extra life.
     *
     * @type {number}
     * @private
     */
    this.m_soundExtra = this.application.sounds.sound.get("rymdsten_sound_ship_extra");
    
    //--------------------------------------------------------------------------
    // Private constants
    //--------------------------------------------------------------------------

    /**
     * Number of points for extra life.
     *
     * @type {number}
     */
    this.EXTRA_LIFE_BONUS = 10000;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObjectContainer.call(this, 0, 0, 1280, 720, "");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.ui.HUD.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rymdsten.ui.HUD.prototype.constructor = rymdsten.ui.HUD;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Number of lives.
 *
 * @member {number} lives
 * @memberof rymdsten.ui.HUD
 * @instance
 */
Object.defineProperty(rymdsten.ui.HUD.prototype, "lives", {
    /**
     * @this rymdsten.ui.HUD
     * @ignore
     */
    get : function() {
        return this.m_lives.num;
    },
    
    /**
     * @this rymdsten.ui.HUD
     * @ignore
     */
    set : function(value) {
        return this.m_lives.num = value;
    }
});

/**
 * Reference to the highscore handler.
 *
 * @member {rune.ui.Highscore} highscore
 * @memberof rymdsten.ui.HUD
 * @instance
 */
Object.defineProperty(rymdsten.ui.HUD.prototype, "highscore", {
    /**
     * @this rymdsten.ui.HUD
     * @ignore
     */
    get : function() {
        return this.m_highscore;
    }
});

/**
 * Current score.
 *
 * @member {number} score
 * @memberof rymdsten.ui.HUD
 * @instance
 */
Object.defineProperty(rymdsten.ui.HUD.prototype, "score", {
    /**
     * @this rymdsten.ui.HUD
     * @ignore
     */
    get : function() {
        return this.m_score.value;
    },
    
    /**
     * @this rymdsten.ui.HUD
     * @ignore
     */
    set : function(value) {
        this.m_score.value = value;
        if (this.m_lives.isMaximized == false) {
            var num = parseInt(this.m_score.value / this.EXTRA_LIFE_BONUS);
            if (this.m_extraLifeCounter < num) {
                this.m_extraLifeCounter++;
                this.m_lives.num++;
                this.m_soundExtra.play(true);
            }
        }
    }
});

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Reset HUD.
 *
 * @return {undefined}
 */
rymdsten.ui.HUD.prototype.reset = function() {
    this.m_score.value = 0;
    this.m_lives.num = 3;
    this.m_extraLifeCounter = 0;
};

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.ui.HUD.prototype.init = function() {
    rune.display.DisplayObjectContainer.prototype.init.call(this);
    this.m_initCopyright();
    this.m_initHighscore();
    this.m_initScore();
    this.m_initLives();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates copyright text.
 *
 * @return {undefined}
 * @private
 */
rymdsten.ui.HUD.prototype.m_initCopyright = function() {
    if (this.m_copyright == null) {
        this.m_copyright = new rymdsten.ui.Copyright();
        this.m_copyright.centerX = this.centerX;
        this.m_copyright.bottom = this.bottom - 28;
        this.addChild(this.m_copyright);
    }
};

/**
 * Creates highscore handler.
 *
 * @return {undefined}
 * @private
 */
rymdsten.ui.HUD.prototype.m_initHighscore = function() {
    if (this.m_highscore == null) {
        this.m_highscore = new rymdsten.ui.Highscore();
        this.m_highscore.centerX = this.centerX;
        this.m_highscore.y = 28;
        this.addChild(this.m_highscore);
    }
};

/**
 * Creates score handler.
 *
 * @return {undefined}
 * @private
 */
rymdsten.ui.HUD.prototype.m_initScore = function() {
    if (this.m_score == null) {
        this.m_score = new rymdsten.ui.Score();
        this.m_score.x = 128;
        this.m_score.y = 28;
        this.addChild(this.m_score);
    }
};

/**
 * Creates life handler.
 *
 * @return {undefined}
 * @private
 */
rymdsten.ui.HUD.prototype.m_initLives = function() {
    if (this.m_lives == null) {
        this.m_lives = new rymdsten.ui.Lives();
        this.m_lives.x = this.m_score.x;
        this.m_lives.y = this.m_score.bottom;
        this.addChild(this.m_lives);
    }
};