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
 * Represents score value.
 */
rymdsten.ui.Score = function() {
    
    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     *  ...
     *
     * @type {number}
     * @private
     */
    this.m_score = 0;

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

rymdsten.ui.Score.prototype = Object.create(rune.text.BitmapField.prototype);
rymdsten.ui.Score.prototype.constructor = rymdsten.ui.Score;

//------------------------------------------------------------------------------
//  Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Value.
 *
 * @member {number} value
 * @memberof rymdsten.ui.Score
 * @instance
 */
Object.defineProperty(rymdsten.ui.Score.prototype, "value", {
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    get : function() {
        return this.m_score;
    },
    
    /**
     * @this rune.display.DisplayObject
     * @ignore
     */
    set : function(value) {
        if (this.m_score != value) {
            this.m_score  = value;
            
            var s = this.m_score.toString();
            while (s.length < 2) {
                s = "0" + s;
            }
            
            this.text = s;
        }
    }
});