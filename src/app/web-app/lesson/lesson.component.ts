import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { Lesson } from '../../models/lessons';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../@core/services/httpService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload'
import { TooltipModule } from 'primeng/tooltip';
import { OperationModeEnum } from '../../../@core/enums/OperationModeEnum';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor'
import { log } from 'console';


@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, IftaLabelModule, TooltipModule, FileUpload, ButtonModule, EditorModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  showDialog: boolean = false;
  dialogHeader: string = '';
  input: Lesson = new Lesson();
  currentLesson!: Lesson;
  lessons: Lesson[] = [];
  moduleId!: string;
  lessonContent: any;
  moduleHeader!: string;
  isAddLesson: boolean = false;
  videoFile: File | null = null;
  text: string = "";
  videoPreviewUrl: string | undefined = '';
  isEdit: boolean = false;
  isAddButton: boolean = false;
  @ViewChild('moduleForm') moduleForm!: NgForm;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('fu') fileUploader!: HTMLInputElement;

  route: ActivatedRoute = inject(ActivatedRoute)
  httpService: HttpService = inject(HttpService)
  messageService: MessageService = inject(MessageService)
  confirmationService: ConfirmationService = inject(ConfirmationService)

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.moduleId = param['module-id']
    })
    this.getLessons().then((resolved) => this.getLessonContent())
  }

  getLessons() {
    return new Promise((resolve) => {
      this.httpService.get('/lesson/get', { moduleId: this.moduleId }).subscribe((res: any) => {
        this.lessons = res.lessons;
        this.currentLesson = this.lessons[0];
        this.moduleHeader = res.lessons?.[0]?.moduleId?.title;
        this.isAddButton = res.button;        
        resolve(true)
      })
    })
  }

  getLessonContent() {
    if(this.currentLesson) {
      this.httpService.get('/lesson/getContent', { lessonId: this.currentLesson?._id }).subscribe((res: any) => {
        this.lessonContent = res.lessonContent;
        setTimeout(() => {
          this.videoPlayer?.nativeElement.load();
        }, 0)
        if (this.lessonContent.length > 0) {
          this.videoPreviewUrl = this.sanitizeVidoUrl(this.lessonContent[0].url)
  
        }
      })
    }
  }

  openDialog() {
    this.showDialog = true
    this.dialogHeader = 'Add Lesson'
    this.input.opsMode = OperationModeEnum.insert;
    this.input.moduleId = this.moduleId
  }

  closeDialog() {
    this.showDialog = false
    this.moduleForm.resetForm();
    this.input = new Lesson()
  }

  save() {
    this.httpService.post('/lesson/saveLesson', this.input).subscribe((res: any) => {
      this.messageService.add({ severity: res.msgType, summary: res.retMsg })
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

        this.httpService.post('/lesson/saveLesson', lesson).subscribe((res: any) => {
          this.messageService.add({ severity: res.msgType, summary: res.retMsg })
          this.getLessons()
        })
      }
    });
  }

  editLesson(lesson: Lesson) {
    this.input = Object.assign({}, lesson);
    this.dialogHeader = 'Edit Lesson'
    this.input.opsMode = OperationModeEnum.update
    this.showDialog = true
  }

  changeLesson(lesson: Lesson) {
    this.currentLesson = lesson
    this.getLessonContent()
    this.isAddLesson = false
  }

  addLessonContent() {
    this.isAddLesson = true
  }

  editLessonContent() {
    this.isAddLesson = true
    this.isEdit = true
    this.text = this.lessonContent[0].note
  }

  onVideoSelect(event: any) {
    // this.fileUploader.upload()
    const file = event.files[0];
    if (file && file.type.startsWith('video/')) {
      this.videoFile = file;
      this.videoPreviewUrl = URL.createObjectURL(file)
    }
  }

  getFileName(path: string): string {
    const parts = path.split(/[/\\]/);
    return parts[parts.length - 1]
  }

  submitLesson() {
    const formData = new FormData();
    formData.append('text', this.text)
    formData.append('lessonId', this.currentLesson._id);
    formData.append('opsMode', this.isEdit ? OperationModeEnum.update : OperationModeEnum.insert);

    if (this.videoFile) {
      formData.append('video', this.videoFile);
    }

    this.httpService.post('/lesson/saveContent', formData).subscribe((res: any) => {
      this.messageService.add({ severity: res.msgType, summary: res.retMsg })
      this.isAddLesson = false
      this.getLessonContent()
    })
  }

  sanitizeVidoUrl(url: string): string {
    return url ? encodeURI('http://localhost:3000/' + url.replace(/\\/g, '/')) : '';
  }

  cancelEdit() {
    this.isAddLesson = false
    this.isEdit = false
    this.text = ""
  }

  deleteVideo() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this video?',
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
        if (this.lessonContent && this.lessonContent?.[0]?.url) {
          this.httpService.post('/lesson/deleteVideo', this.lessonContent[0]).subscribe((res: any) => {
            this.messageService.add({ severity: res.msgType, summary: res.retMsg });

            if(res.msgType == 'success') {
              this.videoPreviewUrl = undefined;
              this.videoFile = null;
  
              this.fileUploader.value = '';
              this.getLessonContent()
              
            }
          })
        } else {
          this.videoPreviewUrl = undefined;
          this.videoFile = null;
          this.fileUploader.value = '';
        }
      }
    });

  }
}
