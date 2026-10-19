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
     * @type {rymdsten.util.GamepadMapping}
     * @private
     */
    this.m_gamepad = new rymdsten.util.GamepadMapping(this.m_playerID);

    /**
     * Keyboard handler.
     *
     * @type {rymdsten.util.KeyboardMapping}
     * @private
     */
    this.m_keyboard = new rymdsten.util.KeyboardMapping(this.m_playerID);
};

//--------------------------------------------------------------------------
// Public prototype getter and setter methods
//--------------------------------------------------------------------------

/**
 * Up.
 *
 * @member {boolean} up
 * @memberof rymdsten.util.Controls
 * @instance
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
 * @instance
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
 * @instance
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
 * @instance
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
 * @instance
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

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Vibrates the current player's gamepad when its device supports feedback.
 *
 * @param {number} duration Duration in milliseconds; zero stops vibration.
 * @param {number} [weak=1.0] Weak motor intensity from zero to one.
 * @param {number} [strong=1.0] Strong motor intensity from zero to one.
 *
 * @returns {undefined}
 */
rymdsten.util.Controls.prototype.vibrate = function(duration, weak, strong) {
    rune.system.Application.instance.inputs.gamepads.get(this.m_playerID).vibrate(
        duration, 0, weak, strong
    );
};
