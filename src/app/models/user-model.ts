export class UserModel implements IUserModel {
    id: number;
    username: string;
    password: string;

    constructor(userModel: IUserModel) {
        this.id = userModel.id;
        this.username = userModel.username;
        this.password = userModel.password;
    }
}

interface IUserModel {
    id: number;
    username: string;
    password: string;
};