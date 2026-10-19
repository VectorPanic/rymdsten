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
 * Wave 002.
 */
rymdsten.wave.Wave002 = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Extend rymdsten.wave.Wave.
     */
    rymdsten.wave.Wave.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.wave.Wave002.prototype = Object.create(rymdsten.wave.Wave.prototype);
rymdsten.wave.Wave002.prototype.constructor = rymdsten.wave.Wave002;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.wave.Wave002.prototype.m_construct = function() {
    this.add("large", 5);
};
