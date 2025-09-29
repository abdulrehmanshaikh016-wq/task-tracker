import { TasksModel } from "./tasks-model";
import { UserModel } from "./user-model";

export class ManageTaskMembersModel implements IManageTaskMembersModel {
  task: TasksModel;
  members: UserModel[];

  constructor(manageTaskMembersModel: IManageTaskMembersModel) {
    this.task = manageTaskMembersModel.task;
    this.members = manageTaskMembersModel.members;
  }
};

interface IManageTaskMembersModel {
  task: TasksModel;
  members: UserModel[];
};