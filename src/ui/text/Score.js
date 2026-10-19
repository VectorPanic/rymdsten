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
     *  Actual score, updated immediately independently of the animated text.
     *
     * @type {number}
     * @private
     */
    this.m_score = 0;

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rune.text.BitmapField.
     */
    rune.text.BitmapField.call(this, "00", "rymdsten_texture_font_large_544x78");

    //--------------------------------------------------------------------------
    // Override public properties
    //--------------------------------------------------------------------------

    /**
     * @inheritDoc
     */
    this.autoSize = true;
    /**
     * Keep two digits while the SDK animates the displayed score.
     */
    this.counter.setFormatter(function(value) {
        var text = Math.round(value).toString();
        return text.length < 2 ? "0" + text : text;
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.ui.Score.prototype = Object.create(rune.text.BitmapField.prototype);
rymdsten.ui.Score.prototype.constructor = rymdsten.ui.Score;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Actual score; the TextCounter animates only the displayed value.
 *
 * @member {number} value
 * @memberof rymdsten.ui.Score
 * @instance
 */
Object.defineProperty(rymdsten.ui.Score.prototype, "value", {
    /**
     * @this rymdsten.ui.Score
     * @ignore
     */
    get : function() {
        return this.m_score;
    },

    /**
     * @this rymdsten.ui.Score
     * @ignore
     */
    set : function(value) {
        if (this.m_score != value) {
            var increasing = value > this.m_score;
            this.m_score = value;
            if (increasing) {
                this.counter.to(value, 800);
            } else {
                // Reset immediately when starting a new game.
                this.counter.value = value;
            }
        }
    }
});
