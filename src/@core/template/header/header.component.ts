import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/httpService';
import { Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

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
  router: Router = inject(Router)
  ngOnInit() {
    this.httpService.get('/screen/getScreens').subscribe((res: any) => {
      this.loggedUser = res.user
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
