// Import necessary modules from Express.js
import { Express, Request, Response } from "express";
// Import authentication routes from a separate module
import authRoutes from './AuthRoutes';


/**
 * Registers routes for the Express.js application.
 * 
 * @param app The Express.js application instance.
 */
export function registerRoutes(app:Express){
    
    // Define a route to check the server's health status
    app.get("/health", (req:Request, res:Response) => {
        // Return a JSON response with a 200 status code and a success message
        res.status(200).json({message: "Server is running properly"});
    })

    // Mount authentication routes at the '/auth' path
    app.use("/auth", authRoutes);
}