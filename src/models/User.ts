import mongoose from 'mongoose';
import { IUser } from '../util/user.dto';

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  name: { type: String, required: true, },
  age: { type: Number, required: true, }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;