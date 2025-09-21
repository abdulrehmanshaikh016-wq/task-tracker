import { CreateANewTaskRoute } from "./create-a-new-task-route.route";
import { authGuard } from "../guards/auth/auth.guard";
import { TasksRoute } from "./tasks.route";
import { Route } from "@angular/router";

export const AuthenticatedRoutes: Route = {
    path: '',
    canActivate: [authGuard],
    children: [
        TasksRoute,
        CreateANewTaskRoute
    ]
};