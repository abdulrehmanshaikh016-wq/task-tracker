export class UserModel implements IUserModel {
    id: number;
    username: string;
    password: string;
    profileImage: string;
    createdDate: Date;

    constructor(userModel: IUserModel) {
        this.id = userModel.id;
        this.username = userModel.username;
        this.password = userModel.password;
        this.profileImage = userModel.profileImage;
        this.createdDate = userModel.createdDate;
    }
}

interface IUserModel {
    id: number;
    username: string;
    password: string;
    profileImage: string;
    createdDate: Date;
};