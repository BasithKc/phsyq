import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: "", loadChildren: () => import("./web-app/web-app.routes").then(m => m.webAppRoutes) },
    {
        path: "login",
        loadComponent: () =>
          import("./web-app/login/login.component").then(
            (m) => m.LoginComponent
          ),
      },
];

