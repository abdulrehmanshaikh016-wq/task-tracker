import { tasksResolver } from "../resolvers/tasks/tasks.resolver";
import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const TasksRoute: Route = {
    path: RoutesEnum.Tasks,
    loadComponent: () => import('../components/tasks/tasks.component').then(m => m.TasksComponent),
    title: 'Tasks',
    resolve: {
        tasks: tasksResolver
    }
};