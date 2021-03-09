//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.state.State
 *
 * @class
 * @classdesc
 * 
 * State for when the player is dead.
 */
rymdsten.scene.GameStateDead = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Handles input.
     *
     * @type {rymdsten.util.Controls}
     * @private
     */
    this.m_controls = new rymdsten.util.Controls();

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.state.State.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.scene.GameStateDead.prototype = Object.create(rune.state.State.prototype);
rymdsten.scene.GameStateDead.prototype.constructor = rymdsten.scene.GameStateDead;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateDead.prototype.update = function(step) {
    rune.state.State.prototype.update.call(this, step);
    this.m_updateInput(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Handles input.
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateDead.prototype.m_updateInput = function(step) {
    if (this.m_controls.fire) {
        this.owner.states.load([new rymdsten.scene.GameStatePlay()]);
    }
};