import { Routes } from "@angular/router";
import { WebAppComponent } from "./web-app.component";
import { HomeComponent } from "./home/home.component";
import { ModuleListComponent } from "./module-list/module-list.component";
import { LessonComponent } from "./lesson/lesson.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { FacultiesComponent } from "./faculties/faculties.component";

export const webAppRoutes: Routes = [
    {
        path: '', component: WebAppComponent,
        children: [
            { path: "", component: LandingPageComponent },
            { path: "home", component: HomeComponent },
            { path: "module-list/:year-id", component: ModuleListComponent },
            { path: "lesson/:module-id", component: LessonComponent },
            { path: "faculty", component: FacultiesComponent},
            {path: 'administration', loadChildren: () => import("./administration/administration.route").then(m => m.administrationRoutes)}
        ]
    }
];