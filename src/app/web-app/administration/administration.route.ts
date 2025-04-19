import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { CourseMappingComponent } from "./course-mapping/course-mapping.component";

export const administrationRoutes: Routes = [
    {
        path: 'user-list', component: UserListComponent,
    },
    {path: 'course-mapping', component: CourseMappingComponent}
];