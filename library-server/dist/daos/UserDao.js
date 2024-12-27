"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// Import Mondgoose and its Scheman and Document types
const mongoose_1 = __importStar(require("mongoose"));
;
// Create a new Mongoose schema for the User model
const UserSchema = new mongoose_1.Schema({
    // Define the fields for the User document
    type: { type: String, required: true }, // Type of user (e.g. admin, customer, etc.)
    firstName: { type: String, required: true }, // First name of the user
    lastName: { type: String, required: true }, // Last name of the user
    email: { type: String, required: true, unique: true }, // Email address of the user (must be unique)
    password: { type: String, required: true } // Password for the user
}, {
    // Disable the automatic creation of a version key for the document
    versionKey: false
});
// Create a Mongoose model named 'User' based on the UserSchema, and export it as the default export
exports.default = mongoose_1.default.model('User', UserSchema);
