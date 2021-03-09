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
 * Represents a manager for keyboard and gamepad input.
 */
rymdsten.util.Controls = function(playerID) {

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
     * Gamepad handler.
     *
     * @type {number}
     * @private
     */
    this.m_gamepad = new rymdsten.util.MappingGamepad(this.m_playerID);

    /**
     * Keyboard handler.
     *
     * @type {number}
     * @private
     */
    this.m_keyboard = new rymdsten.util.MappingKeyboard(this.m_playerID);
};

//--------------------------------------------------------------------------
// Public getter and setter methods
//--------------------------------------------------------------------------

/**
 * Up.
 *
 * @member {boolean} up
 * @memberof rymdsten.util.Controls
 * @readonly
 */
Object.defineProperty(rymdsten.util.Controls.prototype, "up", {
    /**
     * @this rymdsten.util.Controls
     * @ignore
     */
    get : function() {
        return (this.m_keyboard.up || this.m_gamepad.up);
    }
});

/**
 * Right.
 *
 * @member {boolean} right
 * @memberof rymdsten.util.Controls
 * @readonly
 */
Object.defineProperty(rymdsten.util.Controls.prototype, "right", {
    /**
     * @this rymdsten.util.Controls
     * @ignore
     */
    get : function() {
        return (this.m_keyboard.right || this.m_gamepad.right);
    }
});

/**
 * Left.
 *
 * @member {boolean} left
 * @memberof rymdsten.util.Controls
 * @readonly
 */
Object.defineProperty(rymdsten.util.Controls.prototype, "left", {
    /**
     * @this rymdsten.util.Controls
     * @ignore
     */
    get : function() {
        return (this.m_keyboard.left || this.m_gamepad.left);
    }
});

/**
 * Fire.
 *
 * @member {boolean} fire
 * @memberof rymdsten.util.Controls
 * @readonly
 */
Object.defineProperty(rymdsten.util.Controls.prototype, "fire", {
    /**
     * @this rymdsten.util.Controls
     * @ignore
     */
    get : function() {
        return (this.m_keyboard.fire || this.m_gamepad.fire);
    }
});

/**
 * Hyperspace
 *
 * @member {boolean} hyperspace
 * @memberof rymdsten.util.Controls
 * @readonly
 */
Object.defineProperty(rymdsten.util.Controls.prototype, "hyperspace", {
    /**
     * @this rymdsten.util.Controls
     * @ignore
     */
    get : function() {
        return (this.m_keyboard.hyperspace || this.m_gamepad.hyperspace);
    }
});