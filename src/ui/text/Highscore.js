//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.text.BitmapField
 *
 * @class
 * @classdesc
 * 
 * Represents highscore value.
 */
rymdsten.ui.Highscore = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.text.BitmapField.call(this, "00", "rymdsten_texture_font_large_544x78");
    
    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------
    
    /**
     * @inheritDoc
     */
    this.autoSize = true;
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.ui.Highscore.prototype = Object.create(rune.text.BitmapField.prototype);
rymdsten.ui.Highscore.prototype.constructor = rymdsten.ui.Highscore;

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.ui.Highscore.prototype.clear = function() {
    this.application.highscores.clear();
    this.reload();
};

/**
 * @inheritDoc
 */
rymdsten.ui.Highscore.prototype.reload = function() {
    this.text = this.application.highscores.get(0, 0).score.toString();
};

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.ui.Highscore.prototype.init = function() {
    rune.text.BitmapField.prototype.init.call(this);
    this.text = this.application.m_highscores.get(0, 0).score.toString();
};