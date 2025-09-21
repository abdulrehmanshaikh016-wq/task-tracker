import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const WildCardRoute: Route = {
    path: '**',
    redirectTo: RoutesEnum.ScreenLoader
};