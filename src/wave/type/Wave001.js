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
rymdsten.wave.Wave001 = function() {

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

rymdsten.wave.Wave001.prototype = Object.create(rymdsten.wave.Wave.prototype);
rymdsten.wave.Wave001.prototype.constructor = rymdsten.wave.Wave001;

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.wave.Wave001.prototype.m_construct = function() {
    this.add("large", 4);
};
