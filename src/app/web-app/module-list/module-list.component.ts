import { Component, inject, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, NgForm } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { InputTextModule } from "primeng/inputtext"
import { IftaLabelModule } from "primeng/iftalabel"
import { TooltipModule } from "primeng/tooltip"
import { Module } from '../../models/Module';
import { HttpService } from '../../../@core/services/httpService';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OperationModeEnum } from '../../../@core/enums/OperationModeEnum';


@Component({
  selector: 'app-module-list',
  standalone: true,
  imports: [RouterModule, DialogModule, FormsModule, CommonModule, InputTextModule, IftaLabelModule, TooltipModule],
  templateUrl: './module-list.component.html',
  styleUrl: './module-list.component.scss'
})
export class ModuleListComponent {
  dialogHeader: string = 'Add Module'
  showDialog: boolean = false
  modules: Module[] = [];
  input: Module = new Module()
  currentYear!: number;
  @ViewChild('moduleForm') moduleForm!: NgForm;

  httpService: HttpService = inject(HttpService)
  messageService: MessageService = inject(MessageService)
  route: ActivatedRoute = inject(ActivatedRoute)
  router: Router = inject(Router)
  confirmationService: ConfirmationService = inject(ConfirmationService)

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.currentYear = param['year-id']
    })
    this.getModules()
  }

  getModules() {
    this.httpService.getModules('/module/get', this.currentYear).subscribe((res: any) => {
      this.modules = res.modules
    })
  }

  openDialog() {
    this.showDialog = true
    this.input.opsMode = OperationModeEnum.insert
    this.input.year = this.currentYear
  }

  closeDialog() {
    this.showDialog = false
    this.moduleForm.resetForm();
    this.input = new Module()
  }

  save() {
    this.httpService.saveModule('/module/saveModule', this.input).subscribe((res: any) => {
      this.messageService.add({ severity: res.msgType, summary: res.retMsg })
      this.closeDialog()
      this.getModules()
    })
  }

  navigateToLesson(moduleId: string) {
    this.router.navigate(['lesson', moduleId])
  }

  deleteModule(course: Module) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this module?',
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

        this.httpService.saveModule('/module/saveModule', course).subscribe((res: any) => {
          this.messageService.add({ severity: res.msgType, summary: res.retMsg })
          this.getModules()
        })
      }
    });
  }

  editModule(course: Module) {
    this.input = Object.assign({}, course);
    this.input.opsMode = OperationModeEnum.update
    this.showDialog = true
  }
}
