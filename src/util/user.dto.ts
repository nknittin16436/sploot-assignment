export interface IUser {
    email: string;
    password: string;
    name: string;
    age: number;
}
export interface ILoginData {
    email: string;
    password: string;
}
export interface UpdateUserData {
    name: string;
    age: number;
}