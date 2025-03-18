import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", loadChildren: () => import("./web-app/web-app.routes").then(m => m.webAppRoutes) },
];

