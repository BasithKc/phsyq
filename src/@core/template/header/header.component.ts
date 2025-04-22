import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/httpService';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, DialogModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loggedUser: any;
  showProfileDialog: boolean = false;

  httpService: HttpService = inject(HttpService)
  userService: UserService = inject(UserService)
  router: Router = inject(Router)
  ngOnInit() {
    this.httpService.get('/screen/getScreens').subscribe((res: any) => {
      this.loggedUser = res.user
      this.userService.setUser(this.loggedUser)
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
