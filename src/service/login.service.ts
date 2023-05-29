import mongoose from "mongoose";
import User from "../models/User";
import { ILoginData, IUser, UpdateUserData } from "../util/user.dto";
import { getJWTToken } from "../util/user.util";
import * as bcrypt from 'bcryptjs';

const oneHour = 3600000;
export class LoginService {

    public async createUser(createUserData: IUser) {
        const { email, password, name, age } = createUserData;
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return {
                error: {
                    message: "Email already Exist",
                    statusCode: 400
                }
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, name, age });
        return { data: { success: true, message: "User created Succesfully" } }
    }


    public async loginUser(loginData: ILoginData) {
        const { email, password } = loginData;
        console.log(email, password)
        const user = await User.findOne({ email });
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
            const accessToken = getJWTToken(user);
            return { data: { accessToken, success: true } };
        }
        return { error: { message: "Invalid email or password", statusCode: 404 } }
    }

    public async updateUser(updateUserData: UpdateUserData, userIdToBeUpdated: any) {
        const user = await User.findById(userIdToBeUpdated);
        console.log(user);
        if (!user) {
            return {
                error: {
                    message: "No user found with this Id",
                    statusCode: 404
                }
            }
        }
        console.log(userIdToBeUpdated)
        const updatedUser = await User.findByIdAndUpdate(userIdToBeUpdated, updateUserData, { new: true });
        return { data: { success: true, message: "User updated succesfully" } }
    }
}