import { TasksComponent } from "../components/tasks/tasks.component";
import { tasksResolver } from "../resolvers/tasks/tasks.resolver";
import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const TasksRoute: Route = {
    path: RoutesEnum.Tasks,
    component: TasksComponent,
    title: 'Tasks',
    resolve: {
        tasks: tasksResolver
    }
};