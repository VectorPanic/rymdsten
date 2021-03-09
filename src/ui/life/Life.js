//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.display.Graphic
 *
 * @class
 * @classdesc
 * 
 * Represents a life.
 */
rymdsten.ui.Life = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.display.Graphic.call(this, 0, 0, 30, 18, "", "rymdsten_texture_ship_30x18");
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

rymdsten.ui.Life.prototype = Object.create(rune.display.Graphic.prototype);
rymdsten.ui.Life.prototype.constructor = rymdsten.ui.Life;