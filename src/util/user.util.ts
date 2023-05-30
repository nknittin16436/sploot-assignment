import * as jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
export const getJWTToken = (user: IUser) => {
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
    return token;
}


export const getUserFromToken = async (authorizationToken: string) => {
    const jwtToken = authorizationToken.substring('Bearer '.length);
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET as string) as any;
    return decoded.userId;
}