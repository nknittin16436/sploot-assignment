import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import * as JWT from 'jsonwebtoken';


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside middleware")
    const authorization: string | undefined = req?.headers?.authorization;
    console.log(authorization)
    if (authorization && authorization.includes('Bearer')) {
        const jwtToken = authorization.substring('Bearer '.length);
        const user = await validateJWTToken(jwtToken, next);
        if (user) {
            next()
        }
        else {
            return next({ message: "Please Login again" })
        }
    }

}
const validateJWTToken = async (jwtToken: string, next: NextFunction) => {
    try {
        const decoded = JWT.verify(jwtToken, process.env.JWT_SECRET as string) as any;
        console.log(decoded);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return undefined;
        }
        return user;
    } catch (error: any) {
        return next(error)
    }
}

export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside middleware")
    const authorization: string | undefined = req?.headers?.authorization;
    const userIdToBeUpdated = req?.params;
    console.log(userIdToBeUpdated)
    console.log(authorization)
    if (authorization && authorization.includes('Bearer')) {
        const jwtToken = authorization.substring('Bearer '.length);
        const user = await validateJWTToken(jwtToken, next);
        console.log(user)
        if (user) {
            next()
        }
        else {
            return next({ message: "Please Login again" })
        }
    }

}