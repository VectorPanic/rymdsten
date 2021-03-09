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
 * Represents game over text.
 */
rymdsten.ui.GameOver = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.text.BitmapField.call(this, "game over", "rymdsten_texture_font_large_544x78");
    
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

rymdsten.ui.GameOver.prototype = Object.create(rune.text.BitmapField.prototype);
rymdsten.ui.GameOver.prototype.constructor = rymdsten.ui.GameOver;