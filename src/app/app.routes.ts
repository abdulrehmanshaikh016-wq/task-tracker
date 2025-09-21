import { AuthenticatedRoutes } from './routes/authenticated-routes.route';
import { ScreenLoaderRoute } from './routes/screen-loader.route';
import { WildCardRoute } from './routes/wild-card.route';
import { DefaultRoute } from './routes/default.route';
import { SignupRoute } from './routes/signup.route';
import { LoginRoute } from './routes/login.route';
import { Routes } from '@angular/router';

export const routes: Routes = [
    DefaultRoute,
    ScreenLoaderRoute,
    LoginRoute,
    SignupRoute,
    AuthenticatedRoutes,
    WildCardRoute
];