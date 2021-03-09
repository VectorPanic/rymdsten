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
 * Starts a new game round.
 */
rymdsten.scene.GameStateStart = function() {

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

rymdsten.scene.GameStateStart.prototype = Object.create(rune.state.State.prototype);
rymdsten.scene.GameStateStart.prototype.constructor = rymdsten.scene.GameStateStart;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateStart.prototype.init = function() {
    rune.state.State.prototype.init.call(this);
    this.m_initHUD();
    this.m_initWaves();
    this.m_initShips();
    this.m_initAttacks();
};

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateStart.prototype.update = function(step) {
    rune.state.State.prototype.update.call(this, step);
    this.m_updateStateRules(step);
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Resets the HUD.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateStart.prototype.m_initHUD = function() {
    this.owner.hud.reset();
};

/**
 * Resets waves.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateStart.prototype.m_initWaves = function() {
    this.owner.waves.load(0);
};

/**
 * Creates and positions the player.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateStart.prototype.m_initShips = function() {
    if (this.owner.ships.numChildren === 0) {
        this.owner.ships.create(
        this.owner.application.screen.width  >> 1,
        this.owner.application.screen.height >> 1
        );
    }
};

/**
 * Activates attacks.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateStart.prototype.m_initAttacks = function() {
    this.owner.attacks.start();
};

/**
 * Checks the current state.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateStart.prototype.m_updateStateRules = function(step) {
    if (this.owner.ships.numChildren == 0) {
        this.owner.hud.lives--;
        if (this.owner.hud.lives > 0) {
            this.owner.application.scenes.selected.states.load([new rymdsten.scene.GameStateDead()]);
        } else {
            this.owner.application.scenes.selected.states.load([new rymdsten.scene.GameStateOver()]);
        }
    }
};