import { Component, inject } from '@angular/core';
import { HttpService } from '../../services/httpService';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, DialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loggedUser: any;
  showProfileDialog: boolean = false;

  httpService: HttpService = inject(HttpService)
  ngOnInit() {
    this.httpService.get('/screen/getScreens').subscribe((res: any) => {
      this.loggedUser = res.user
    })
  }
}
