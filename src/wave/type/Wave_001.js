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
 * Wave 001.
 */
rymdsten.wave.Wave_001 = function() {

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

rymdsten.wave.Wave_001.prototype = Object.create(rymdsten.wave.Wave.prototype);
rymdsten.wave.Wave_001.prototype.constructor = rymdsten.wave.Wave_001;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.wave.Wave_001.prototype.m_construct = function() {
    this.add("large", 4);
};