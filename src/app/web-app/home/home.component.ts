import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  years: any[] = []


  ngOnInit() {
    this.years = [
      { 
        slNo: 1, 
        title: 'Year 1',
        description: 'Foundation courses in psychology, research methods, and human behavior.',
        img: '/assets/images/brain.jpg',
      },
      { 
        slNo: 2, 
        title: 'Year 2',
        description: 'Advanced concepts in cognitive psychology and behavioral analysis.',
        img: '/assets/images/pexels-alex-green-5699456.jpg' 
      },
      { 
        slNo: 3, 
        title: 'Year 3',
        description: 'Specialized topics and practical applications in clinical psychology.',
        img: '/assets/images/Sites.jpg' 
      },
    ]
  }
}
