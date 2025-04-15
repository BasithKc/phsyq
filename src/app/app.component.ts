import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { LoaderServcie } from '../@core/services/loaderService';
import { ProgressSpinnerModule } from "primeng/progressspinner"
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ProgressSpinnerModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isLoading = false;
  title = 'Psyq';

  loaderService: LoaderServcie = inject(LoaderServcie)

  constructor() {
    this.loaderService.$loading.subscribe(loading => {
      this.isLoading = loading;
    })
  }
}
