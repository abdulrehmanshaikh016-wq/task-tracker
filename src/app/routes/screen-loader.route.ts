import { ScreenLoaderComponent } from "../components/screen-loader/screen-loader.component";
import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const ScreenLoaderRoute: Route = {
    path: RoutesEnum.ScreenLoader,
    component: ScreenLoaderComponent
};