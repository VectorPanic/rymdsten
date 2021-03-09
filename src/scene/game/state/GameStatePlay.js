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
 * Game state.
 */
rymdsten.scene.GameStatePlay = function() {

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

rymdsten.scene.GameStatePlay.prototype = Object.create(rune.state.State.prototype);
rymdsten.scene.GameStatePlay.prototype.constructor = rymdsten.scene.GameStatePlay;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.GameStatePlay.prototype.init = function() {
    rune.state.State.prototype.init.call(this);
    this.m_initPlayer();
};

/**
 * @inheritDoc
 */
rymdsten.scene.GameStatePlay.prototype.update = function(step) {
    rune.state.State.prototype.update.call(this, step);
    this.m_updateStateRules(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates and positions the player.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStatePlay.prototype.m_initPlayer = function() {
    if (this.owner.ships.numChildren === 0) {
        this.owner.ships.create(
        this.owner.application.screen.width  >> 1,
        this.owner.application.screen.height >> 1
        );
    }
};

/**
 * Checks the current state.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStatePlay.prototype.m_updateStateRules = function(step) {
    if (this.owner.ships.numChildren == 0) {
        this.owner.hud.lives--;
        if (this.owner.hud.lives > 0) {
            this.owner.application.scenes.selected.states.load([new rymdsten.scene.GameStateDead()]);
        } else {
            this.owner.application.scenes.selected.states.load([new rymdsten.scene.GameStateOver()]);
        }
    }
};