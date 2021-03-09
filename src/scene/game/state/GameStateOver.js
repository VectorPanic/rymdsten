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
 * Game over state.
 */
rymdsten.scene.GameStateOver = function() {

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
    
    /**
     * Game over text.
     *
     * @type {rymdsten.ui.GameOver}
     * @private
     */
    this.m_text = null;

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

rymdsten.scene.GameStateOver.prototype = Object.create(rune.state.State.prototype);
rymdsten.scene.GameStateOver.prototype.constructor = rymdsten.scene.GameStateOver;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateOver.prototype.init = function() {
    rune.state.State.prototype.init.call(this);
    this.m_initText();
    this.m_initHighscore();
};

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateOver.prototype.update = function(step) {
    rune.state.State.prototype.update.call(this, step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateOver.prototype.dispose = function() {
    rune.state.State.prototype.dispose.call(this);
    this.m_disposeText();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates "Game Over" text.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateOver.prototype.m_initText = function() {
    if (this.m_text == null) {
        this.m_text = new rymdsten.ui.GameOver();
        this.m_text.centerX = this.owner.cameras.getCamera(0).centerX;
        this.m_text.centerY = this.owner.cameras.getCamera(0).centerY;
        this.owner.stage.addChild(this.m_text);
    }
};

/**
 * Checks if the current score is a new high score.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateOver.prototype.m_initHighscore = function() {
    this.owner.application.m_highscores.send(this.owner.hud.score, "NO_NAME", 0);
    this.owner.hud.highscore.reload();
    this.owner.hud.highscore.centerX = this.owner.hud.highscore.parent.centerX;
};

/**
 * Handles input.
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateOver.prototype.m_updateInput = function(step) {
    if (this.m_controls.fire) {
        this.owner.states.load([new rymdsten.scene.GameStateIntro()]);
    }
};

/**
 * Removes game over text.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateOver.prototype.m_disposeText = function() {
    if (this.m_text instanceof rymdsten.ui.GameOver) {
        this.m_text.dispose();
        this.m_text = null;
    }
};