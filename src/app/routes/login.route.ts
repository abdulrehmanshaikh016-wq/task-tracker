import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const LoginRoute: Route = {
    path: RoutesEnum.Login,
    loadComponent: () => import("../components/login/login.component").then(m => m.LoginComponent)
};