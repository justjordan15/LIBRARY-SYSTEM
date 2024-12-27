"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import the Express.js module
const mongoose_1 = __importDefault(require("mongoose")); // Import the Mongoose module for MongoDB
const cors_1 = __importDefault(require("cors")); // Import the CORS module for cross-origin resource sharing
const config_1 = require("./config"); // Import the configuration file, which contains settings such as the server port and MongoDB URL
const routes_1 = require("./routes"); // Import the route registration function, which sets up the app's routing configuration
const PORT = config_1.config.server.port; // Get the port number from the configuration file
const app = (0, express_1.default)(); // Create an Express.js app instance
app.use(express_1.default.json()); // Configure the app to parse JSON requests
app.use((0, cors_1.default)()); // Enable CORS
/**
 * Immediately invoked asynchronous function to set up and start the server.
 */
(function startUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /**
            * Establish a connection to the MongoDB database using Mongoose.
            * Options:
            *  - w: 'majority' (wait for majority of nodes to confirm write operations)
            *  - retryWrites: true (retry write operations if they fail)
            *  - authMechanism: "DEFAULT" (use default authentication mechanism)
            */
            yield mongoose_1.default.connect(config_1.config.mongo.url, { w: 'majority', retryWrites: true, authMechanism: "DEFAULT" });
            /**
            * Log a success message to the console if the connection is established.
            */
            console.log("Connection to MongoDB successfully made");
            /**
            * Register routes for the Express.js app.
            */
            (0, routes_1.registerRoutes)(app);
            /**
            * Start the server and listen on the specified port.
            */
            app.listen(PORT, () => {
                /**
                * Log a message to the console indicating the server is listening.
                */
                console.log(`Server listening on port ${PORT}`);
            });
        }
        catch (error) {
            /**
            * Catch any errors that occur during the connection or setup process and log a generic error message to the console.
            */
            console.log("Could not make connection to the database");
        }
    });
})();
