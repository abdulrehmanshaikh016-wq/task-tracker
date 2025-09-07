import { HomeComponent } from "../components/home/home.component";
import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const HomeRoute: Route = {
    path: RoutesEnum.Home,
    component: HomeComponent
};