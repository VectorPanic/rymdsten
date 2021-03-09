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
 * Represents push start text.
 */
rymdsten.ui.PushStart = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.text.BitmapField.call(this, "push start", "rymdsten_texture_font_large_544x78");
    
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

rymdsten.ui.PushStart.prototype = Object.create(rune.text.BitmapField.prototype);
rymdsten.ui.PushStart.prototype.constructor = rymdsten.ui.PushStart;

//------------------------------------------------------------------------------
// Override public prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.ui.PushStart.prototype.init = function() {
    rune.text.BitmapField.prototype.init.call(this);
    this.flicker(Infinity, 1000);
};