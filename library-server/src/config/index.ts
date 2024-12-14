import dotenv from 'dotenv';


// Load environment variables from .env file
dotenv.config();

// Set MongoDB credentials from environment variables or default to empty strings
const MONGO_USERNAME:string = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD:string = process.env.MONGO_PASSWORD || '';

// Construct MongoDB connection URL using credentials and default host and port
const MONGO_URL:string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/librarydb`;

// Set server port from environment variable or default to 8000
const PORT:number = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 8000;

// Set number of rounds from environment variable or generate a random number between 0 and 10
const ROUNDS:number = process.env.SERVER_ROUNDS ? Number(process.env.SERVER_ROUNDS) : Math.floor(Math.random() * 11);

// Export configuration object with MongoDB URL, server port, and number of rounds
export const config = {
    mongo : {
        url: MONGO_URL
    },
    server: {
        port: PORT,
        rounds: ROUNDS
    }
}