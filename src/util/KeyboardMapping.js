//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @param {number} [playerID=0] Zero-based player input index.
 *
 * @class
 * @classdesc
 *
 * Keyboard mapping.
 */
rymdsten.util.KeyboardMapping = function(playerID) {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Player ID.
     *
     * @type {number}
     * @private
     */
    this.m_playerID = playerID || 0;

    /**
     * UP.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_up = ["W"];

    /**
     * Right.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_right = ["D"];

    /**
     * Left.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_left = ["A"];

    /**
     * Fire.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_fire = ["SPACE"];

    /**
     * Hyperspace.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_hyperspace = ["S"];
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Up.
 *
 * @member {boolean} up
 * @memberof rymdsten.util.KeyboardMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.KeyboardMapping.prototype, "up", {
    /**
     * @this rymdsten.util.KeyboardMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.keyboard.pressed(this.m_up[this.m_playerID]);
    }
});

/**
 * Right.
 *
 * @member {boolean} right
 * @memberof rymdsten.util.KeyboardMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.KeyboardMapping.prototype, "right", {
    /**
     * @this rymdsten.util.KeyboardMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.keyboard.pressed(this.m_right[this.m_playerID]);
    }
});

/**
 * Left.
 *
 * @member {boolean} left.
 * @memberof rymdsten.util.KeyboardMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.KeyboardMapping.prototype, "left", {
    /**
     * @this rymdsten.util.KeyboardMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.keyboard.pressed(this.m_left[this.m_playerID]);
    }
});

/**
 * Fire.
 *
 * @member {boolean} fire.
 * @memberof rymdsten.util.KeyboardMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.KeyboardMapping.prototype, "fire", {
    /**
     * @this rymdsten.util.KeyboardMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.keyboard.justPressed(this.m_fire[this.m_playerID]);
    }
});

/**
 * Hyperspace.
 *
 * @member {boolean} hyperspace
 * @memberof rymdsten.util.KeyboardMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.KeyboardMapping.prototype, "hyperspace", {
    /**
     * @this rymdsten.util.KeyboardMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.keyboard.justPressed(this.m_hyperspace[this.m_playerID]);
    }
});
