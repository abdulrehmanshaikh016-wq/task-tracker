import { UserModel } from "./user-model";

export class TaskMemberModel extends UserModel implements ITaskMemberModel {
  showDeleteLoader: boolean;

  constructor(taskMemberModel: TaskMemberModel) {
    super(taskMemberModel);
    this.showDeleteLoader = taskMemberModel.showDeleteLoader;
  }
};

interface ITaskMemberModel {
  showDeleteLoader: boolean;
};