"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
// Import authentication routes from a separate module
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
/**
 * Registers routes for the Express.js application.
 *
 * @param app The Express.js application instance.
 */
function registerRoutes(app) {
    // Define a route to check the server's health status
    app.get("/health", (req, res) => {
        // Return a JSON response with a 200 status code and a success message
        res.status(200).json({ message: "Server is running properly" });
    });
    // Mount authentication routes at the '/auth' path
    app.use("/auth", AuthRoutes_1.default);
}
