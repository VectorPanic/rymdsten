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
 * Gamepad mapping.
 */
rymdsten.util.MappingGamepad = function(playerID) {

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
// Public getter and setter methods
//------------------------------------------------------------------------------

/**
 * Up.
 *
 * @member {boolean} up
 * @memberof rymdsten.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingGamepad.prototype, "up", {
    /**
     * @this rymdsten.util.MappingGamepad
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.gamepads.get(this.m_playerID).stickLeftUp;
    }
});

/**
 * Right.
 *
 * @member {boolean} right
 * @memberof rymdsten.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingGamepad.prototype, "right", {
    /**
     * @this rymdsten.util.MappingGamepad
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.gamepads.get(this.m_playerID).stickLeftRight;
    }
});

/**
 * Left.
 *
 * @member {boolean} right
 * @memberof rymdsten.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingGamepad.prototype, "left", {
    /**
     * @this rymdsten.util.MappingGamepad
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.gamepads.get(this.m_playerID).stickLeftLeft;
    }
});

/**
 * Fire.
 *
 * @member {boolean} fire
 * @memberof rymdsten.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingGamepad.prototype, "fire", {
    /**
     * @this rymdsten.util.MappingGamepad
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.gamepads.get(this.m_playerID).justPressed(0);
    }
});

/**
 * Hyperspace.
 *
 * @member {boolean} hyperspace
 * @memberof rymdsten.util.MappingGamepad
 * @readonly
 */
Object.defineProperty(rymdsten.util.MappingGamepad.prototype, "hyperspace", {
    /**
     * @this rymdsten.util.MappingGamepad
     * @ignore
     */
    get : function() {
        return rune.system.Main.instance.inputs.gamepads.get(this.m_playerID).justPressed(5);
    }
});