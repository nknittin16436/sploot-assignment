import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import * as JWT from 'jsonwebtoken';


export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside middleware")
    const authorization: string | undefined = req?.headers?.authorization;
    console.log(authorization)
    if (authorization && authorization.includes('Bearer')) {
        const jwtToken = authorization.substring('Bearer '.length);
        const user = await validateJWTToken(jwtToken);
        if (user) {
            next()
        }
    }

}
const validateJWTToken = async (jwtToken: string) => {
    try {
        const decoded = JWT.verify(jwtToken, process.env.JWT_SECRET as string) as any;
        console.log(decoded);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return undefined;
        }
        return user;
    } catch (e: any) {
        console.log(e);
        throw new Error(e.message);
    }
}