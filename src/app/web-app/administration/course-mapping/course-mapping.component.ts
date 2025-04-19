import { Component, inject } from '@angular/core';
import { ListboxModule } from 'primeng/listbox'
import { User } from '../../../models/user';
import { HttpService } from '../../../../@core/services/httpService';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-course-mapping',
  standalone: true,
  imports: [ListboxModule, FormsModule, TableModule, CheckboxModule],
  templateUrl: './course-mapping.component.html',
  styleUrl: './course-mapping.component.scss'
})
export class CourseMappingComponent {
  users: User[] = [];
  selectedUser!: User;
  years: any[] = []

  http: HttpService = inject(HttpService)
  messageService: MessageService = inject(MessageService)
  
  ngOnInit() {
    this.getUsers().then(() => {this.getModules()
    })
  }
  
  getUsers() {
    return new Promise((resolve) => {
      this.http.get('/admin/getUsers').subscribe((res: any) => {
        this.users = res.users;
        this.selectedUser = this.users[0];
        resolve(true)
      })
    })
  }

  getModules() {
    this.http.get('/module/getModule', {year: 'All', user: this.selectedUser._id }).subscribe((res: any) => {
      this.years = res.modules
    })
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.getModules()
  }

  changeAccess(module: any){
    this.http.post('/admin/updateModuleAccess', { userId: this.selectedUser._id, moduleId: module._id,  action: module.access ? 'add' : 'remove' }).subscribe((res: any) => {      
      this.messageService.add({severity: res.msgType , summary: res.retMsg})
      this.getModules()
    })
  }

}
