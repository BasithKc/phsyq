import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Lesson } from '../../models/lessons';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../@core/services/httpService';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, IftaLabelModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  showDialog: boolean = false
  dialogHeader: string = 'Add Lesson'
  input: Lesson = new Lesson()

  route: ActivatedRoute = inject(ActivatedRoute)
  httpService: HttpService = inject(HttpService)
  messageService: MessageService = inject(MessageService)

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.input.moduleId = param['module-id']
    })
  }

  openDialog() {
    this.showDialog = true
  }

  closeDialog() {
    this.showDialog = false
  }

  save() {
    this.httpService.saveLesson('/lesson/saveLesson', this.input).subscribe((res: any) => {
      this.messageService.add({severity: res.msgType, summary: res.retMsg})
      this.closeDialog()
    })
  }
}
