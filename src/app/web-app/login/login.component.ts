import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../models/login';
import { Signup } from '../../models/signup';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin: boolean = true;
  loginData: Login =  {
    email: '',
    password: ''
  };

  signupData: Signup = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  toggleSignup() {
    this.isLogin = !this.isLogin;
  }

  login() {

  }

  signup() {

  }
}
