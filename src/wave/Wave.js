//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 *
 * @class
 * @classdesc
 * 
 * Represents a wave of asteroids.
 */
rymdsten.wave.Wave = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------

    /**
     * Requested asteroids.
     *
     * @type {Array.<string>}
     * @private
     */
    this.m_asteroids = [];
    
    //--------------------------------------------------------------------------
    // Constructor call
    //--------------------------------------------------------------------------

    /**
     * ...
     */
    this.m_construct();
};

//------------------------------------------------------------------------------
// Public prototype methods (API)
//------------------------------------------------------------------------------

/**
 * Add asteroid to wave.
 *
 * @param {string} type ...
 * @param {number} [num=1] ...
 *
 * @return {undefined}
 */
rymdsten.wave.Wave.prototype.add = function(type, num) {
    num = num || 1;
    for (var i = 0; i < num; i++) {
        this.m_asteroids.push(type);
    }
};

//------------------------------------------------------------------------------
// Protected prototype methods
//------------------------------------------------------------------------------

/**
 * Class constructor.
 *
 * @return {undefined}
 * @protected
 */
rymdsten.wave.Wave.prototype.m_construct = function() {
    //@note: Override from child class.
};