//------------------------------------------------------------------------------
// Namespace
//------------------------------------------------------------------------------

/**
 * The application namespace.
 *
 * @namespace rymdsten
 */
var rymdsten = function() {

    //--------------------------------------------------------------------------
    // Public static scope
    //--------------------------------------------------------------------------

    /**
     * Public scope.
     *
     * @type {Object}
     * @private
     */
    var m_this = {};

    //--------------------------------------------------------------------------
    // Package structure
    //--------------------------------------------------------------------------

    /**
     * Namespace for saucer attack management.
     *
     * @namespace attack
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.attack = {};

    /**
     * Namespace for embedded resource definitions.
     *
     * @namespace data
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.data = {};

    /**
     * Namespace for game objects and particles.
     *
     * @namespace entity
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.entity = {};

    /**
     * Namespace for game scenes and states.
     *
     * @namespace scene
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.scene = {};

    /**
     * Namespace for the application entry point.
     *
     * @namespace system
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.system = {};

    /**
     * Namespace for the heads-up display and text fields.
     *
     * @namespace ui
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.ui = {};

    /**
     * Namespace for input mappings and shared controls.
     *
     * @namespace util
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.util = {};

    /**
     * Namespace for asteroid wave definitions.
     *
     * @namespace wave
     * @memberof rymdsten
     * @since 1.0
     */
    m_this.wave = {};

    //--------------------------------------------------------------------------
    // Return public scope object
    //--------------------------------------------------------------------------

    /**
     * Public scope.
     */
    return m_this;

}();
