//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * ...
 */
rymdsten.scene.Splash = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * The Overthinkers logo.
     *
     * @type {rymdsten.ui.OverthinkersLogo}
     * @private
     */
    this.m_logo = null;
    
    /**
     * Sound FX.
     *
     * @type {rymdsten.ui.OverthinkersLogo}
     * @private
     */
    this.m_sound = this.application.resources.get("rymdsten_sound_asteroid_explode_large");

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * ...
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

rymdsten.scene.Splash.prototype = Object.create(rune.scene.Scene.prototype);
rymdsten.scene.Splash.prototype.constructor = rymdsten.scene.Splash;

//------------------------------------------------------------------------------
// Private static constants
//------------------------------------------------------------------------------

/**
 * Delay duration.
 *
 * @constant {number}
 * @private
 */
rymdsten.scene.Splash.DELAY_DURATION = 1000;

/**
 * Fade duration.
 *
 * @constant {number}
 * @private
 */
rymdsten.scene.Splash.FADE_DURATION = 2000;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.Splash.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initLogo();
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.Splash.prototype.m_initCamera = function() {
    rune.scene.Scene.prototype.m_initCamera.call(this);
    this.cameras.getCamera(0).fade.opacity = 1.0;
    this.timers.create({
        duration: rymdsten.scene.Splash.DELAY_DURATION,
        scope: this,
        onComplete: this.m_fadeIn
    });
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates the logo.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.Splash.prototype.m_initLogo = function() {
    if (this.m_logo == null) {
        this.m_logo = new rymdsten.ui.OverthinkersLogo();
        this.m_logo.centerX = this.application.screen.centerX;
        this.m_logo.centerY = this.application.screen.centerY;
        this.stage.addChild(this.m_logo);
    }
};

/**
 * Fade in camera.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.Splash.prototype.m_fadeIn = function() {
    this.m_sound.play(true);
    this.cameras.getCamera(0).fade.in(
        rymdsten.scene.Splash.FADE_DURATION,
        this.m_onFadeInComplete,
        this
    );
};

/**
 * On fade in complete.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.Splash.prototype.m_onFadeInComplete = function() {
    this.timers.create({
        duration: rymdsten.scene.Splash.DELAY_DURATION,
        scope: this,
        onComplete: this.m_fadeOut
    });
};

/**
 * Fade out camera.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.Splash.prototype.m_fadeOut = function() {
    this.cameras.getCamera(0).fade.out(
        rymdsten.scene.Splash.FADE_DURATION,
        this.m_onFadeOutComplete,
        this
    );
};

/**
 * On fade out complete.
 *
 * @return {undefined}
 * @private
 */
rymdsten.scene.Splash.prototype.m_onFadeOutComplete = function() {
    this.application.scenes.load([new rymdsten.scene.Game()]);
};