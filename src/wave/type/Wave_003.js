//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rymdsten.wave.Wave
 *
 * @class
 * @classdesc
 * 
 * Wave 003.
 */
rymdsten.wave.Wave_003 = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rymdsten.wave.Wave.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.wave.Wave_003.prototype = Object.create(rymdsten.wave.Wave.prototype);
rymdsten.wave.Wave_003.prototype.constructor = rymdsten.wave.Wave_003;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.wave.Wave_003.prototype.m_construct = function() {
    this.add("large",  6);
    this.add("medium", 1);
    this.add("small",  2);
};