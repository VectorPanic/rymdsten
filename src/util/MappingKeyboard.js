//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Keyboard mapping.
 */
rymdsten.util.MappingKeyboard = function(playerID) {

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
     * @type {array}
     * @private
     */
    this.m_up = ["W"];

    /**
     * Right.
     *
     * @type {array}
     * @private
     */
    this.m_right = ["D"];

    /**
     * Left.
     *
     * @type {array}
     * @private
     */
    this.m_left = ["A"];

    /**
     * Fire.
     *
     * @type {array}
     * @private
     */
    this.m_fire = ["SPACE"];

    /**
     * Hyperspace.
     *
     * @type {array}
     * @private
     */
    this.m_hyperspace = ["S"];
};

//------------------------------------------------------------------------------
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * Up.
 *
 * @member {boolean} up
 * @memberof rymdsten.util.MappingKeyboard
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingKeyboard.prototype, "up", {
    /**
     * @this rymdsten.util.MappingKeyboard
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.keyboard.pressed(this.m_up[this.m_playerID]);
    }
});

/**
 * Right.
 *
 * @member {boolean} right
 * @memberof rymdsten.util.MappingKeyboard
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingKeyboard.prototype, "right", {
    /**
     * @this rymdsten.util.MappingKeyboard
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.keyboard.pressed(this.m_right[this.m_playerID]);
    }
});

/**
 * Left.
 *
 * @member {boolean} left.
 * @memberof rymdsten.util.MappingKeyboard
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingKeyboard.prototype, "left", {
    /**
     * @this rymdsten.util.MappingKeyboard
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.keyboard.pressed(this.m_left[this.m_playerID]);
    }
});

/**
 * Fire.
 *
 * @member {boolean} fire.
 * @memberof rymdsten.util.MappingKeyboard
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingKeyboard.prototype, "fire", {
    /**
     * @this rymdsten.util.MappingKeyboard
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.keyboard.justPressed(this.m_fire[this.m_playerID]);
    }
});

/**
 * Hyperspace.
 *
 * @member {boolean} hyperspace
 * @memberof rymdsten.util.MappingKeyboard
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingKeyboard.prototype, "hyperspace", {
    /**
     * @this rymdsten.util.MappingKeyboard
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.keyboard.justPressed(this.m_hyperspace[this.m_playerID]);
    }
});