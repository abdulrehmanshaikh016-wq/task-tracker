import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const DefaultRoute: Route = {
    path: '', // Empty path means what if the user just loads the main website url. And does not add a sub-route.
    pathMatch: 'full',
    redirectTo: RoutesEnum.ScreenLoader // In such cases we will redirect the user to a screen loader page.
};