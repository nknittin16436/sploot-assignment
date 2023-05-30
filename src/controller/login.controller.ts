import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { LoginService } from "../service/login.service";

export class LoginController {
    private loginService: LoginService;

    constructor(@Inject loginService: LoginService) {
        this.loginService = loginService;
    }

    public async signUpUser(req: Request, res: Response, next: NextFunction) {
        try {
            const createUserData = req.body;
            const { error, data } = await this.loginService.createUser(createUserData);
            console.log(error, data)
            if (error) {
                return next(error);
            }
            res.status(201).json({ statusCode: 201, data, message: "User created Succesfully" })
        } catch (error: any) {
            console.log(error)
            next(error)
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { data, error } = await this.loginService.loginUser(req.body);
            if (error) {
                return next(error);
            }
            res.status(200).json({ statusCode: 200, data, message: "User Logged In Succesfully" })

        } catch (error: any) {
            next(error)
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.email || req.body.password) {
                return next({ message: "Cannot update Email and Passsword", statusCode: 400 })
            }
            const updateUserData = req.body;
            const userIdToBeUpdated = req.params.userId;
            console.log(updateUserData, userIdToBeUpdated)
            const { error, data } = await this.loginService.updateUser(updateUserData, userIdToBeUpdated);
            if (error) {
                return next(error)
            }
            res.status(201).json({ success: true, data, message: "User Updated succesfully" })
        } catch (error: any) {
            next(error)
        }
    }

}