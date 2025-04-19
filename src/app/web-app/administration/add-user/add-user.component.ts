import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IftaLabelModule } from 'primeng/iftalabel';
import { HttpService } from '../../../../@core/services/httpService';
import { MessageService } from 'primeng/api';
import { User } from '../../../models/user';
import { CheckboxModule } from 'primeng/checkbox';
import { OperationModeEnum } from '../../../../@core/enums/OperationModeEnum';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [IftaLabelModule, FormsModule, CheckboxModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  user: User = new User()

  ref: DynamicDialogRef = inject(DynamicDialogRef);
  config: DynamicDialogConfig = inject(DynamicDialogConfig)
  httpService: HttpService = inject(HttpService)
  messageService: MessageService = inject(MessageService)

  ngOnInit() {
    if(this.config.data){
      this.user = this.config.data
      this.user.isAdmin = this.user.isAdmin ? 1 : 0;
      this.user.isCourseAccess = this.user.isCourseAccess ? 1 : 0;
      this.user.opsMode = OperationModeEnum.update
    }else {
      this.user.opsMode = OperationModeEnum.insert
    }
  }

   closeDialog() {
      this.ref?.close()
    }

  save() {
    this.httpService.post('/admin/saveUser', this.user).subscribe((res: any) => {
      this.messageService.add({ severity: res.msgType, summary: res.retMsg })
      if(res.msgType == 'success') {
        this.closeDialog()
      }     
    })
  }
}
