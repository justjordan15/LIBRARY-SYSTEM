// Import Mondgoose and its Scheman and Document types
import mongoose, {Schema, Document} from 'mongoose';

// Import the IUser interface, which defines the shape of the user data
import {IUser} from '../models/User';

// Define an interface for the User model, which extends the IUser interface and Mongoose's Document interface
export interface IUserModel extends IUser, Document{};


// Create a new Mongoose schema for the User model
const UserSchema = new Schema(
    {
        // Define the fields for the User document
        type: {type:String, required:true}, // Type of user (e.g. admin, customer, etc.)
        firstName: {type:String, required:true}, // First name of the user
        lastName: {type:String, required:true}, // Last name of the user
        email: {type:String, required:true, unique:true}, // Email address of the user (must be unique)
        password: {type:String, required:true} // Password for the user

    },
    {
        // Disable the automatic creation of a version key for the document
        versionKey: false
    }
);

// Create a Mongoose model named 'User' based on the UserSchema, and export it as the default export
export default mongoose.model<IUserModel>('User', UserSchema);