import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [RouterModule, DialogModule, FormsModule, CommonModule],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.scss'
})
export class ModuleListComponent {
  dialogHeader: string = 'Add Module'
  showDialog: boolean = false

  courses: any[] = [
    {
      id: 1,
      title: 'Introduction to Psychology',
      description: 'Fundamental principles and theoretical perspectives',
      lectureCount: 12
    },
    {
      id: 2,
      title: 'Research Methods',
      description: 'Scientific methods and ethical considerations in psychology',
      lectureCount: 8
    },
    {
      id: 3,
      title: 'Biological Psychology',
      description: 'Biological bases of behavior and mental processes',
      lectureCount: 10
    },
    {
      id: 4,
      title: 'Learning & Cognition',
      description: 'Principles of learning and information processing',
      lectureCount: 9
    },
    {
      id: 5,
      title: 'Developmental Psychology',
      description: 'Human development across the lifespan',
      lectureCount: 11
    },
    {
      id: 6,
      title: 'Social Psychology',
      description: 'How people think about, influence, and relate to others',
      lectureCount: 7
    }
  ];

  openDialog() {
    this.showDialog = true
  }

  closeDialog() {
    this.showDialog = false
  }

  save() {

  }
}
