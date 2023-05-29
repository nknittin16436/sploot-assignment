import User from "../models/User";
import { ILoginData, IUser } from "../util/user.dto";
import { getJWTToken } from "../util/user.util";
import * as bcrypt from 'bcryptjs';

const oneHour = 3600000;
export class LoginService {
    public async createUser(createUserData: IUser) {
        const { email, password, name, age } = createUserData;
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return {
                error: "Email already exist"
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, name, age });
        return { success: true, user }
    }


    public async loginUser(loginData: ILoginData) {
        const { email, password } = loginData;
        console.log(email, password)
        const user = await User.findOne({ email });
        console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
            const accessToken = getJWTToken(user);
            return { accessToken, success: true };
        }
        return { error: "Invalid email or password" }
    }

    public async updateUser() {

    }
}