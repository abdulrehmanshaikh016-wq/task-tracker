import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const SignupRoute: Route = {
    path: RoutesEnum.Signup,
    title: 'Signup Page',
    loadComponent: () => import("../pages/signup-page/signup-page.component").then(m => m.SignupPageComponent)
};