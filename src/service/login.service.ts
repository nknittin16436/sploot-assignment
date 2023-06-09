import User, { IUser } from "../models/User";
import { ILoginData, UpdateUserData } from "../util/user.dto";
import { getJWTToken } from "../util/user.util";
import * as bcrypt from 'bcryptjs';

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
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const accessToken = getJWTToken(user);
            return { data: { accessToken, success: true } };
        }
        return { error: { message: "Invalid email or password", statusCode: 404 } }
    }

    public async updateUser(updateUserData: UpdateUserData, userIdToBeUpdated: any) {
        const user = await User.findById(userIdToBeUpdated);
        if (!user) {
            return {
                error: {
                    message: "No user found with this Id",
                    statusCode: 404
                }
            }
        }
        await User.findByIdAndUpdate(userIdToBeUpdated, updateUserData);
        return { data: { success: true, message: "User updated succesfully" } }
    }
}