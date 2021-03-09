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
 * Overthinkers logo.
 */
rymdsten.ui.OverthinkersLogo = function() {

    //--------------------------------------------------------------------------
    //  Constructor call
    //--------------------------------------------------------------------------
    
    /**
     *  ...
     */
    rune.display.Graphic.call(this, 0, 0, 395, 60, "", "rymdsten_texture_overthinkers_395x60");
};

//------------------------------------------------------------------------------
//  Inheritance
//------------------------------------------------------------------------------

rymdsten.ui.OverthinkersLogo.prototype = Object.create(rune.display.Graphic.prototype);
rymdsten.ui.OverthinkersLogo.prototype.constructor = rymdsten.ui.OverthinkersLogo;