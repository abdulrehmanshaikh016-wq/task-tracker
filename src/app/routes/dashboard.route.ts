import { RoutesEnum } from "./routes.enum";
import { Route } from "@angular/router";

export const DashboardRoute: Route = {
    path: RoutesEnum.Dashboard,
    loadComponent: () => import('../pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Dashboard',
};