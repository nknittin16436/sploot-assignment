import { NextFunction, Request, Response } from "express";
import { Inject } from "typescript-ioc";
import { LoginService } from "../service/login.service";

export class LoginController {
    private loginService: LoginService;

    constructor(@Inject loginService: LoginService) {
        this.loginService = loginService;
    }

    public async signUpUser(req: Request, res: Response) {
        try {
            const createUserData = req.body;
            const resp = await this.loginService.createUser(createUserData);
            res.status(201).json({ success: true, resp, message: "User created Succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }

    public async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { accessToken, error } = await this.loginService.loginUser(req.body);
            res.status(200).json({ success: true, accessToken, message: "User logged in succesfully" })
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message })
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        // try {
        //     const { accessToken, error } = await this.loginService.updateUser(req.body);
        //     res.status(201).json({ success: true, accessToken, message: "User logged in succesfully" })
        // } catch (error: any) {
        //     res.status(400).json({ success: false, message: error.message })
        // }
    }

}