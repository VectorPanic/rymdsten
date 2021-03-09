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
 * Game state.
 */
rymdsten.scene.Game = function() {

    //--------------------------------------------------------------------------
    // Private properties
    //--------------------------------------------------------------------------
    
    /**
     * Handles (UFO) attacks.
     *
     * @type {rymdsten.attack.Attacks}
     * @private
     */
    this.m_attacks = null;
    
    /**
     * The heads up display.
     *
     * @type {rymdsten.ui.HUD}
     * @private
     */
    this.m_hud = null;
    
    /**
     * Handler for ships.
     *
     * @type {rymdsten.entity.Ships}
     * @private
     */
    this.m_ships = null;
    
    /**
     * Handler for waves.
     *
     * @type {rymdsten.wave.Waves}
     * @private
     */
    this.m_waves = null;

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

rymdsten.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
rymdsten.scene.Game.prototype.constructor = rymdsten.scene.Game;

//------------------------------------------------------------------------------
// Public prototype getter and setter methods
//------------------------------------------------------------------------------

/**
 * Reference to the asteroid handler.
 *
 * @member {rymdsten.entity.Asteroids} asteroids
 * @memberof rymdsten.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.scene.Game.prototype, "asteroids", {
    /**
     * @this rymdsten.scene.Game
     * @ignore
     */
    get : function() {
        return this.m_asteroids;
    }
});

/**
 * Reference to the attack handler.
 *
 * @member {rymdsten.attack.Attacks} attacks
 * @memberof rymdsten.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.scene.Game.prototype, "attacks", {
    /**
     * @this rymdsten.scene.Game
     * @ignore
     */
    get : function() {
        return this.m_attacks;
    }
});

/**
 * Reference to the HUD.
 *
 * @member {rymdsten.ui.HUD} HUD
 * @memberof rymdsten.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.scene.Game.prototype, "hud", {
    /**
     * @this rymdsten.scene.Game
     * @ignore
     */
    get : function() {
        return this.m_hud;
    }
});

/**
 * Reference to the ship handler.
 *
 * @member {rymdsten.entity.Ships} ships
 * @memberof rymdsten.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.scene.Game.prototype, "ships", {
    /**
     * @this rymdsten.scene.Game
     * @ignore
     */
    get : function() {
        return this.m_ships;
    }
});

/**
 * Reference to the wave handler.
 *
 * @member {rymdsten.wave.Waves} waves
 * @memberof rymdsten.scene.Game
 * @instance
 * @readonly
 */
Object.defineProperty(rymdsten.scene.Game.prototype, "waves", {
    /**
     * @this rymdsten.scene.Game
     * @ignore
     */
    get : function() {
        return this.m_waves;
    }
});

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.Game.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    this.m_initHUD();
    this.m_initAttacks();
    this.m_initShips();
    this.m_initWaves();
    this.m_initState();
};

/**
 * @inheritDoc
 */
rymdsten.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    this.m_updateAttacks(step);
    this.m_updateWaves(step);
    this.m_updateInput(step);
};

/**
 * @inheritDoc
 */
rymdsten.scene.Game.prototype.dispose = function() {
    this.m_disposeWaves();
    this.m_disposeShips();
    this.m_disposeAttacks();
    this.m_disposeHUD();
    rune.scene.Scene.prototype.dispose.call(this);
};

//------------------------------------------------------------------------------
// Override protected prototype methods
//------------------------------------------------------------------------------

/**
 * @inheritDoc
 */
rymdsten.scene.Game.prototype.m_initCamera = function() {
    rune.scene.Scene.prototype.m_initCamera.call(this);
    this.cameras.getCamera(0).fade.opacity = 1.0;
    this.cameras.getCamera(0).fade.in(3000); //@note: Magic number.
};

//------------------------------------------------------------------------------
// Private prototype methods
//------------------------------------------------------------------------------

/**
 * Creates the HUD.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_initHUD = function() {
    this.m_disposeHUD();
    if (this.m_hud == null) {
        this.m_hud = new rymdsten.ui.HUD();
        this.application.screen.addChild(this.m_hud);
    } else throw new Error();
};

/**
 * Creates the attack manager.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_initAttacks = function() {
    this.m_disposeAttacks();
    if (this.m_attacks == null) {
        this.m_attacks = new rymdsten.attack.Attacks(this);
    } else throw new Error();
};

/**
 * Creates the ships manager.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_initShips = function() {
    this.m_disposeShips();
    if (this.m_ships == null) {
        this.m_ships = this.groups.add(new rymdsten.entity.Ships(this));
    } else throw new Error();
};

/**
 * Creates the waves manager.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_initWaves = function() {
    this.m_disposeWaves();
    if (this.m_waves == null) {
        this.m_waves = new rymdsten.wave.Waves(this);
        this.m_waves.add(new rymdsten.wave.Wave_001());
        this.m_waves.add(new rymdsten.wave.Wave_002());
        this.m_waves.add(new rymdsten.wave.Wave_003());
    } else throw new Error();
};

/**
 * Activates sub-states.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_initState = function() {
    this.states.load([new rymdsten.scene.GameStateIntro()]);
};

/**
 * Updates the attack manager.
 *
 * @param {number} step ...
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_updateAttacks = function(step) {
    if (this.m_attacks != null) {
        this.m_attacks.update(step);
    }
};

/**
 * Updates the waves manager.
 *
 * @param {number} step ...
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_updateWaves = function(step) {
    if (this.m_waves != null) {
        this.m_waves.update(step);
    }
};

/**
 * Check for debug input.
 *
 * @param {number} step ...
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_updateInput = function(step) {
    if (this.keyboard.pressed("X")) {
        
        // DEBUG RENDER
        if (this.keyboard.justPressed("C")) {
            this.cameras.getCamera(0).debug = !this.cameras.getCamera(0).debug;
        }
        
        // NEXT WAVES
        if (this.keyboard.justPressed("N")) {
            this.m_waves.next();
        }
        
        // PREVIOUS WAVES
        if (this.keyboard.justPressed("P")) {
            this.m_waves.previous();
        }
        
        // KILL SHIP
        if (this.keyboard.justPressed("K")) {
            if (this.m_ships.numChildren > 0) {
                this.m_ships.getChildAt(0).kill()
            }
        }
        
        // RESET HIGHSCORE
        if (this.keyboard.justPressed("R")) {
            this.m_hud.highscore.clear();
        }
        
        // CREATE LARGE SAUCER
        if (this.keyboard.justPressed("L")) {
            this.m_attacks.saucers.create(0, 0, "large");
        }
        
        // CREATE SMALL SAUCER
        if (this.keyboard.justPressed("S")) {
            this.m_attacks.saucers.create(0, 0, "small");
        }
        
        // EXTRA LIFE
        if (this.keyboard.justPressed("E")) {
            this.m_hud.score += 10000;
        }
    }
};

/**
 * Removes the waves handler.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_disposeWaves = function() {
    if (this.m_waves instanceof rymdsten.wave.Waves) {
        this.m_waves.dispose();
        this.m_waves = null;
    }
};

/**
 * Removes the ships handler.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_disposeShips = function() {
    if (this.m_ships instanceof rymdsten.entity.Ships) {
        this.m_ships.dispose();
        this.m_ships = null;
    }
};

/**
 * Removes the attack handler.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_disposeAttacks = function() {
    if (this.m_attacks instanceof rymdsten.attack.Attacks) {
        this.m_attacks.dispose();
        this.m_attacks = null;
    }
};

/**
 * Removes the HUD.
 *
 * @returns {undefined} ...
 * @private
 */
rymdsten.scene.Game.prototype.m_disposeHUD = function() {
    if (this.m_hud instanceof rymdsten.ui.HUD) {
        this.m_hud.dispose();
        this.m_hud = null;
    }
};