import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  age: number;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, },
  name: { type: String, required: true, },
  age: { type: Number, required: true, }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;