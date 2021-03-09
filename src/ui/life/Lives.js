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
 * Represents a manager for life.
 */
rymdsten.ui.Lives = function() {
    
    //--------------------------------------------------------------------------
    // Public constant
    //--------------------------------------------------------------------------

    /**
     * Max number of lives.
     *
     * @type {number}
     */
    this.MAX_LIVES = 8;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.DisplayObjectContainer.call(this, 0, 0, 18 * this.MAX_LIVES, 18, "");
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.ui.Lives.prototype = Object.create(rune.display.DisplayObjectContainer.prototype);
rymdsten.ui.Lives.prototype.constructor = rymdsten.ui.Lives;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * If the maximum number of extra lives is met.
 *
 * @member {boolean} isMaximized
 * @memberof rymdsten.ui.Lives
 * @instance
 */
Object.defineProperty(rymdsten.ui.Lives.prototype, "isMaximized", {
    /**
     * @this rymdsten.ui.Lives
     * @ignore
     */
    get : function() {
        return (this.num >= this.MAX_LIVES);
    }
});

/**
 * Number of lives.
 *
 * @member {number} num
 * @memberof rymdsten.ui.Lives
 * @instance
 */
Object.defineProperty(rymdsten.ui.Lives.prototype, "num", {
    /**
     * @this rymdsten.ui.Lives
     * @ignore
     */
    get : function() {
        return this.numChildren;
    },
    
    /**
     * @this rymdsten.ui.Lives
     * @ignore
     */
    set : function(value) {
        this.m_initLives(value);
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.ui.Lives.prototype.init = function() {
    rune.display.DisplayObjectContainer.prototype.init.call(this);
    this.m_initLives(3);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates extra life.
 *
 * @return {undefined}
 * @private
 */
rymdsten.ui.Lives.prototype.m_initLives = function(num) {
    num = num || 0;
    num = Math.min(num, this.MAX_LIVES);
    this.removeChildren();
    for (var i = 0; i < num; i++) {
        var life = new rymdsten.ui.Life();
            life.x = (i * life.height) - 6;
            life.y = 5;
            life.rotation = -90;
            
        this.addChild(life);
    }
};