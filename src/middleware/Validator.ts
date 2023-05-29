import { body, validationResult, ValidationChain } from 'express-validator';
import { RequestHandler } from 'express';

const validateData = (validations: ValidationChain[]): RequestHandler => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ statusCode: 400, error: errorMessages, message: "Invalid data" });
    };
};

export default validateData;