import express from 'express';
import { Container } from 'typescript-ioc';
import { LoginController } from '../controller/login.controller';
import { authenticateUser } from '../middleware/Authentication';

const router = express.Router();


const loginController: LoginController = Container.get(LoginController);

router.post("/signup", (req, res, next) => {
    loginController.signUpUser(req, res);
});

router.post("/login", (req, res, next) => {
    loginController.loginUser(req, res, next);
});
router.patch("/users/:userId", authenticateUser, (req, res, next) => {
    loginController.updateUser(req, res, next);
});

export { router as LoginRouter };