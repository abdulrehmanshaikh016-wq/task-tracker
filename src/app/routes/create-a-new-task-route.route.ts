import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const CreateANewTaskRoute: Route = {
    path: RoutesEnum.CreateANewTask,
    loadComponent: () => import('../components/create-a-new-task/create-a-new-task.component').then(m => m.CreateANewTaskComponent),
    title: 'Create a New Task'
};