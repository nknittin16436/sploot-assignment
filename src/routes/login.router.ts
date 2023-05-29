import express, { NextFunction, Request } from 'express';
import { Container } from 'typescript-ioc';
import { LoginController } from '../controller/login.controller';
import { authenticateUser, authorizeUser } from '../middleware/Authentication';

import { Response } from 'express-serve-static-core';
import { loginSchema, signupSchema, updateUserSchema } from '../util/validationSchema';
import validateData from '../middleware/Validator';
import { validationResult } from 'express-validator';

const router = express.Router();


const loginController: LoginController = Container.get(LoginController);

router.post("/signup",
    signupSchema,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const errorMessages = errors.array().map((error) => error.msg);
        if (!errors.isEmpty()) {
            return res.status(400).json({ statusCode: 400, error: errorMessages, message: "Invalid input data" });
        }
        loginController.signUpUser(req, res, next);
    });

router.post("/login",
    loginSchema,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const errorMessages = errors.array().map((error) => error.msg);
        if (!errors.isEmpty()) {
            return res.status(400).json({ statusCode: 400, error: errorMessages, message: "Invalid input data" });
        }
        loginController.loginUser(req, res, next);
    });
router.patch("/users/:userId",
    updateUserSchema,
    authorizeUser,
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        const errorMessages = errors.array();
        if (!errors.isEmpty()) {
            return res.status(400).json({ statusCode: 400, error: errorMessages, message: "Invalid input data" });
        }
        loginController.updateUser(req, res, next);
    });

export { router as LoginRouter };