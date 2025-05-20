import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.scss'
})
export class FacultiesComponent {
  faculties: any[] = []
  currentSlideIndex = 0;

  ngOnInit() {
    this.faculties = [
      { name: 'Ajmal', image: '/assets/images/ajmal.jpg' },
      { name: 'Arshad', image: '/assets/images/arshad.jpg' },
      { name: 'Fida', image: '/assets/images/fida.jpg' },
      { name: 'Junaid', image: '/assets/images/junaid.jpg' },
    ];
    this.startSlideInterval();
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.faculties.length;
    // Reset the interval after manual navigation
    clearInterval(this.slideInterval);
    this.startSlideInterval();
  }

  slideInterval: any;

  startSlideInterval() {
    this.slideInterval = setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.faculties.length;
    }, 4000);
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.faculties.length) % this.faculties.length;
  }
}
