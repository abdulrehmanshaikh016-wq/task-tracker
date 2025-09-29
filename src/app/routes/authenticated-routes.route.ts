import { ManageTaskMembersRoute } from "./manage-task-members.route";
import { CreateANewTaskRoute } from "./create-a-new-task.route";
import { authGuard } from "../guards/auth/auth.guard";
import { EditTaskRoute } from "./edit-task.route";
import { TasksRoute } from "./tasks.route";
import { Route } from "@angular/router";

export const AuthenticatedRoutes: Route = {
    path: '',
    canActivate: [authGuard],
    children: [
        TasksRoute,
        CreateANewTaskRoute,
        EditTaskRoute,
        ManageTaskMembersRoute
    ]
};