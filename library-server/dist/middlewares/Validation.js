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
exports.Schemas = void 0;
exports.ValidateSchema = ValidateSchema;
// Import Joi library and its ObjectSchema type
const joi_1 = __importDefault(require("joi"));
/**
 * Returns a middleware function that validates the request body against a provided Joi schema.
 *
 * @param schema - The Joi schema to validate against
 * @returns A middleware function that validates the request body
 */
function ValidateSchema(schema) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            // Validate the request body against the schema
            yield schema.validateAsync(req.body);
            // If validation succeeds, call the next middleware function
            next();
        }
        catch (error) {
            // If validation fails, return a 422 error response with a JSON message
            res.status(422).json({ message: "Object validation failed, please include a valid object" });
        }
    });
}
/**
 * Defines Joi schemas for user creation and login
 */
exports.Schemas = {
    user: {
        /**
         * Schema for creating a new user
         */
        create: joi_1.default.object({
            // User type (ADMIN, EMPLOYEE, PATRON)
            type: joi_1.default.string().valid('ADMIN', 'EMPLOYEE', 'PATRON').required(),
            // First name
            firstName: joi_1.default.string().required(),
            // Last name
            lastName: joi_1.default.string().required(),
            // Email address
            email: joi_1.default.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            // Password
            password: joi_1.default.string().required()
        }),
        /**
         * Schema for user login
         */
        login: joi_1.default.object({
            // Email address
            email: joi_1.default.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            // Password
            password: joi_1.default.string().required()
        })
    }
};
