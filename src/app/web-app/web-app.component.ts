import { Component, HostListener } from '@angular/core';
import { HeaderComponent } from '../../@core/template/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../@core/template/footer/footer.component';

@Component({
  selector: 'app-web-app',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FooterComponent],
  templateUrl: './web-app.component.html',
  styleUrl: './web-app.component.scss'
})
export class WebAppComponent {
  @HostListener('window:scroll', ['$event']) 
  scrollHandler(event:any) {
   // Check if the scroll position is greater than 150px
   if (event.target.scrollTop > 150) {
     document.getElementById('navBar')?.classList.add('fixed-header');
   } else {
     document.getElementById('navBar')?.classList.remove('fixed-header');
   }
  }
}
