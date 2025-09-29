import { TasksModel } from "./tasks-model";
import { UserModel } from "./user-model";

export class ManageTaskMembersModel implements IManageTaskMembersModel {
  task: TasksModel;
  members: UserModel[];
  allUsersFromStorage: UserModel[];

  constructor(manageTaskMembersModel: IManageTaskMembersModel) {
    this.task = manageTaskMembersModel.task;
    this.members = manageTaskMembersModel.members;
    this.allUsersFromStorage = manageTaskMembersModel.allUsersFromStorage;
  }
};

interface IManageTaskMembersModel {
  task: TasksModel;
  members: UserModel[];
  allUsersFromStorage: UserModel[];
};