import { editTaskResolver } from "../resolvers/edit-task/edit-task.resolver";
import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const EditTaskRoute: Route = {
    title: 'Edit a Task',
    path: RoutesEnum.EditTask,
    resolve: {
        task: editTaskResolver
    },
    loadComponent: () => import('../pages/edit-task-page/edit-task-page.component').then(m => m.EditTaskPageComponent),
};