import { LoginComponent } from "../components/login/login.component";
import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const LoginRoute: Route = {
    path: RoutesEnum.Login,
    component: LoginComponent
};