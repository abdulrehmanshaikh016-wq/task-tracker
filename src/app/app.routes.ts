import { ScreenLoaderRoute } from './routes/screen-loader.route';
import { LoginRoute } from './routes/login.route';
import { RoutesEnum } from './routes/routes.enum';
import { HomeRoute } from './routes/home.route';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', // Empty path means what if the user just loads the main website url. And does not add a sub-route.
        pathMatch: 'full',
        redirectTo: RoutesEnum.ScreenLoader // In such cases we will redirect the user to a screen loader page.
    },
    ScreenLoaderRoute,
    LoginRoute,
    HomeRoute
];