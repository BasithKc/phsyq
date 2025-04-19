import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table'
import { HttpService } from '../../../../@core/services/httpService';
import { CheckboxModule } from 'primeng/checkbox';
import { TagModule } from 'primeng/tag';
import { DialogService, DynamicDialog, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '../../../models/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OperationModeEnum } from '../../../../@core/enums/OperationModeEnum';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, TagModule, DynamicDialog, TooltipModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: User[]= [];
  ref: DynamicDialogRef | undefined;

  http: HttpService = inject(HttpService)
  dialogService: DialogService = inject(DialogService)
  messageService: MessageService = inject(MessageService)
  confirmationService: ConfirmationService = inject(ConfirmationService)

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.http.get('/admin/getUsers').subscribe((res: any) => {
      this.users = res.users;
      this.users = this.users.map((user: any) => {
        return {
          ...user,
          isVerified: user.isVerified ? 'Verified' : 'Unverified'
        }
      })    
    })
  }

  getSeverity(status: string) {
    switch (status) {
        case 'Verified':
            return 'success';
        default :
            return 'danger';
    }
  }

  addUser() {
    this.ref = this.dialogService.open(AddUserComponent, {
      header: 'Add user',
      width: '50vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      closable: true
    })

    this.ref.onClose.subscribe(() => {
      this.getUsers();
    });  
  }

  editUser(user: User) {
    this.ref = this.dialogService.open(AddUserComponent, {
      header: 'Add user',
      width: '40vw',
      modal:true,
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      closable: true,
      data: Object.assign({}, user)
    })
    this.ref.onClose.subscribe(() => {
      this.getUsers();
    });  
  }

  deleteUser (user: User ){
    this.confirmationService.confirm({
          message: 'Do you want to delete the user?',
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
            user.opsMode = OperationModeEnum.delete
            this.http.post('/admin/saveUser', user).subscribe((res: any) => {
              this.messageService.add({ severity: res.msgType, summary: res.retMsg })
              this.getUsers()
            })
          }
        });
  }
}
