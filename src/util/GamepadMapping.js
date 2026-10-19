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
 * Gamepad mapping.
 */
rymdsten.util.GamepadMapping = function(playerID) {

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
};

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Thrust via the right analog stick.
 *
 * @member {boolean} up
 * @memberof rymdsten.util.GamepadMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.GamepadMapping.prototype, "up", {
    /**
     * @this rymdsten.util.GamepadMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.gamepads.get(this.m_playerID).stickRightUp;
    }
});

/**
 * Right.
 *
 * @member {boolean} right
 * @memberof rymdsten.util.GamepadMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.GamepadMapping.prototype, "right", {
    /**
     * @this rymdsten.util.GamepadMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.gamepads.get(this.m_playerID).stickLeftRight;
    }
});

/**
 * Left.
 *
 * @member {boolean} left
 * @memberof rymdsten.util.GamepadMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.GamepadMapping.prototype, "left", {
    /**
     * @this rymdsten.util.GamepadMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.gamepads.get(this.m_playerID).stickLeftLeft;
    }
});

/**
 * Fire or start via R2 / the right trigger.
 *
 * @member {boolean} fire
 * @memberof rymdsten.util.GamepadMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.GamepadMapping.prototype, "fire", {
    /**
     * @this rymdsten.util.GamepadMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.gamepads.get(this.m_playerID).justPressed(7); // R2 / right trigger (standard gamepad mapping).
    }
});

/**
 * Hyperspace.
 *
 * @member {boolean} hyperspace
 * @memberof rymdsten.util.GamepadMapping
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.util.GamepadMapping.prototype, "hyperspace", {
    /**
     * @this rymdsten.util.GamepadMapping
     * @ignore
     */
    get : function() {
        return rune.system.Application.instance.inputs.gamepads.get(this.m_playerID).justPressed(5);
    }
});
