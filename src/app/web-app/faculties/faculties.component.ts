import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.scss'
})
export class FacultiesComponent {
  faculties: any[] = [
    { name: 'Ajmal', image: '/assets/images/ajmal.jpg' },
    { name: 'Arshad', image: '/assets/images/arshad.jpg' },
    { name: 'Fida', image: '/assets/images/fida.jpg' },
    { name: 'Junaid', image: '/assets/images/junaid.jpg' },
  ];

  ngOnInit() {

  }
}
