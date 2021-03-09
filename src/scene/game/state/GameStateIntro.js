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
 * Game intro.
 */
rymdsten.scene.GameStateIntro = function() {

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
     * Push start text.
     *
     * @type {rymdsten.ui.PushStart}
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

rymdsten.scene.GameStateIntro.prototype = Object.create(rune.state.State.prototype);
rymdsten.scene.GameStateIntro.prototype.constructor = rymdsten.scene.GameStateIntro;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateIntro.prototype.init = function() {
    rune.state.State.prototype.init.call(this);
    this.m_initShips();
    this.m_initWaves();
    this.m_initAttacks();
    this.m_initText();
};

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateIntro.prototype.update = function(step) {
    rune.state.State.prototype.update.call(this, step);
    this.m_updateInput();
};

/**
 * @inheritDoc
 */
rymdsten.scene.GameStateIntro.prototype.dispose = function() {
    rune.state.State.prototype.dispose.call(this);
    this.m_disposeText();
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Reset ship.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateIntro.prototype.m_initShips = function() {
    this.owner.ships.reset();
};

/**
 * Reset waves.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateIntro.prototype.m_initWaves = function() {
    this.owner.waves.load(0);
};

/**
 * Reset attacks.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateIntro.prototype.m_initAttacks = function() {
    this.owner.attacks.reset();
};

/**
 * Creates "Push Start" text.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateIntro.prototype.m_initText = function() {
    if (this.m_text == null) {
        this.m_text = new rymdsten.ui.PushStart();
        this.m_text.centerX = this.owner.cameras.getCamera(0).centerX;
        this.m_text.centerY = this.owner.cameras.getCamera(0).centerY;
        this.owner.stage.addChild(this.m_text);
    }
};

/**
 * Handles input.
 *
 * @param {number} step ...
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateIntro.prototype.m_updateInput = function(step) {
    if (this.m_controls.fire) {
        this.owner.states.load([new rymdsten.scene.GameStateStart()]);
    }
};

/**
 * Deletes text.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.GameStateIntro.prototype.m_disposeText = function() {
    if (this.m_text instanceof rymdsten.ui.PushStart) {
        this.m_text.dispose();
        this.m_text = null;
    }
};