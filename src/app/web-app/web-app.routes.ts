import { Routes } from "@angular/router";
import { WebAppComponent } from "./web-app.component";
import { HomeComponent } from "./home/home.component";
import { ModuleListComponent } from "./module-list/module-list.component";
import { LessonComponent } from "./lesson/lesson.component";

export const webAppRoutes: Routes = [
    {
        path: '', component: WebAppComponent,
        children: [
            { path: "", component: HomeComponent },
            { path: "module-list/:year-id", component: ModuleListComponent },
            { path: "lesson/:module-id", component: LessonComponent },
            {path: 'administration', loadChildren: () => import("./administration/administration.route").then(m => m.administrationRoutes)}
        ]
    }
];