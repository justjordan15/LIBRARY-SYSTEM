import express, {Express, Request, Response} from 'express'; // Import the Express.js module
import mongoose from 'mongoose'; // Import the Mongoose module for MongoDB
import cors from 'cors'; // Import the CORS module for cross-origin resource sharing
import {config} from './config'; // Import the configuration file, which contains settings such as the server port and MongoDB URL
import {registerRoutes} from './routes'; // Import the route registration function, which sets up the app's routing configuration


const PORT = config.server.port; // Get the port number from the configuration file

const app:Express = express(); // Create an Express.js app instance

app.use(express.json()); // Configure the app to parse JSON requests
app.use(cors()); // Enable CORS


/**
 * Immediately invoked asynchronous function to set up and start the server.
 */
(async function startUp(){ 
    try {
        /**
        * Establish a connection to the MongoDB database using Mongoose.
        * Options:
        *  - w: 'majority' (wait for majority of nodes to confirm write operations)
        *  - retryWrites: true (retry write operations if they fail)
        *  - authMechanism: "DEFAULT" (use default authentication mechanism)
        */
        await mongoose.connect(config.mongo.url, {w:'majority', retryWrites:true, authMechanism:"DEFAULT"});


        /**
        * Log a success message to the console if the connection is established.
        */
        console.log("Connection to MongoDB successfully made");


        /**
        * Register routes for the Express.js app.
        */
        registerRoutes(app);

        /**
        * Start the server and listen on the specified port.
        */
        app.listen(PORT, () => {
            /**
            * Log a message to the console indicating the server is listening.
            */
            console.log(`Server listening on port ${PORT}`);
        })

    } catch (error) {
        /**
        * Catch any errors that occur during the connection or setup process and log a generic error message to the console.
        */
        console.log("Could not make connection to the database");
    }
})()

