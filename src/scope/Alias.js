//------------------------------------------------------------------------------
// Global scope aliases
//------------------------------------------------------------------------------

/**
 * Exports the application to the global scope.
 */
if (typeof window !== "undefined") {
    if (typeof window.rymdsten === "undefined") {
        window.rymdsten = rymdsten;
    }
}

/**
 * Registers the application with Rune OS when running inside its environment.
 */
if (typeof window !== "undefined" && typeof window.runeos === "object") {
    window.runeos.install(rymdsten);
}