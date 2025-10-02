import { TasksModel } from "./tasks-model";
import { UserModel } from "./user-model";

export class DashboardResolverModel implements IDashboardResolverModel {
    tasks: TasksModel[];
    users: UserModel[];

    constructor(dashboardResolverModel: DashboardResolverModel) {
        this.tasks = dashboardResolverModel.tasks;
        this.users = dashboardResolverModel.users;
    }
};

interface IDashboardResolverModel {
    tasks: TasksModel[];
    users: UserModel[];
};