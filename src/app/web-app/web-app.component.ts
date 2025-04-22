import { Component, HostListener, inject } from '@angular/core';
import { HeaderComponent } from '../../@core/template/header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../@core/template/footer/footer.component';
import { ToastModule } from "primeng/toast"
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {  ProgressSpinnerModule } from 'primeng/progressspinner'
import { LoaderServcie } from '../../@core/services/loaderService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-web-app',
  standalone: true,
  imports: [HeaderComponent, RouterModule, FooterComponent, ToastModule, ConfirmDialogModule, ProgressSpinnerModule, CommonModule],
  templateUrl: './web-app.component.html',
  styleUrl: './web-app.component.scss'
})
export class WebAppComponent {
  isLoading = false;
  @HostListener('window:scroll', ['$event']) 

loaderService: LoaderServcie = inject(LoaderServcie)

  constructor() {
    this.loaderService.$loading.subscribe(loading => {
      this.isLoading = loading;
    })
  }

  scrollHandler(event:any) {
   // Check if the scroll position is greater than 150px
   if (event.target.scrollTop > 150) {
     document.getElementById('navBar')?.classList.add('fixed-header');
   } else {
     document.getElementById('navBar')?.classList.remove('fixed-header');
   }
  }
}
