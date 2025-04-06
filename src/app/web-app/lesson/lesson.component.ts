import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Lesson } from '../../models/lessons';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../@core/services/httpService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { OperationModeEnum } from '../../../@core/enums/OperationModeEnum';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, IftaLabelModule, TooltipModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  showDialog: boolean = false
  dialogHeader: string = 'Add Lesson'
  input: Lesson = new Lesson()
  lessons: Lesson[] = [];
  moduleId!: string; 
  @ViewChild('moduleForm') moduleForm!: NgForm;

  route: ActivatedRoute = inject(ActivatedRoute)
  httpService: HttpService = inject(HttpService)
  messageService: MessageService = inject(MessageService)
  confirmationService: ConfirmationService = inject(ConfirmationService)

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.moduleId = param['module-id']
    })
    this.getLessons()
  }

  getLessons() {
    this.httpService.getLessons('/lesson/get', this.moduleId).subscribe((res: any) => {
      this.lessons = res.lessons
    })
  }

  openDialog() {
    this.showDialog = true
    this.input.opsMode = OperationModeEnum.insert;
    this.input.moduleId = this.moduleId
  }

  closeDialog() {
    this.showDialog = false
    this.moduleForm.resetForm();
    this.input = new Lesson()
  }

  save() {
    this.httpService.saveLesson('/lesson/saveLesson', this.input).subscribe((res: any) => {
      this.messageService.add({severity: res.msgType, summary: res.retMsg})
      this.closeDialog()
      this.getLessons()
    })
  }

  deleteLesson(lesson: Lesson) {
      this.confirmationService.confirm({
        message: 'Do you want to delete this lesson?',
        header: 'Confirmation',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
          label: 'Cancel',
          severity: 'secondary',
          outlined: true,
        },
        acceptButtonProps: {
          label: 'Delete',
          severity: 'danger',
        },
  
        accept: () => {
          this.input.opsMode = OperationModeEnum.delete
  
          this.httpService.saveLesson('/lesson/saveLesson',lesson).subscribe((res: any) => {
            this.messageService.add({ severity: res.msgType, summary: res.retMsg })
            this.getLessons()
          })
        }
      });
    }

    editLesson(lesson: Lesson) {
      this.input = Object.assign({}, lesson);
      this.input.opsMode = OperationModeEnum.update
      this.showDialog = true
    }
}
