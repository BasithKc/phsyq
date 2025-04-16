import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../models/login';
import { Signup } from '../../models/signup';
import { HttpService } from '../../../@core/services/httpService';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isLogin: boolean = true;
  isOtp: boolean = false;
  isLoginOtp: boolean = false;
  errorMsg: string = "";
  loginErrorMsg: string = "";
  loginData: Login =  {
    email: '',
    password: '',
    otp: ''
  };
  signupData: Signup = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  };

  router: Router = inject(Router)
  httpService: HttpService = inject(HttpService)
  messageService: MessageService = inject(MessageService)
  authService: AuthService = inject(AuthService)

  toggleSignup() {
    this.isLogin = !this.isLogin;
  }

  login() {
    if(this.isLoginOtp) {
      this.verifyOtp()
      return;
    }
    this.httpService.post('/auth/login', this.loginData).subscribe( 
    (res: any) => {      
      localStorage.setItem('token', res.token)
      this.router.navigate([''])
    },
    (error: any) => {
      this.loginErrorMsg = error.error.retMsg
      if(error.error.notVerfied) {
        this.isLoginOtp = true
      }
    })
  }

  signWithGoogle() {
    this.authService.signInWithGoogle().then(token  => {
      this.httpService.post('/auth/google', {token}).subscribe( 
      (res: any) => {
        localStorage.setItem('token', res.token)
        setTimeout(() => {
          this.router.navigate(['']);
        }, 100);
      },
      (error: any) => {
        this.errorMsg = error.error.retMsg
      })
    })
  }

  signup() {
    if(this.signupData.password != this.signupData.confirmPassword) {
      this.errorMsg = 'Password do not match'
      return;
    }
    this.errorMsg = "";
    this.httpService.post('/auth/sendOTP', this.signupData).subscribe(
      (res: any) => {
      if(res.msgType == 'success') {
        this.isOtp = true;
      }
    },
    (error: any) => {
      this.errorMsg = error.error.retMsg
    })
  }

  verifyOtp() {
    this.httpService.post('/auth/verifyOTP', {otp: this.isLoginOtp ? this.loginData.otp : this.signupData.otp, email: this.isLoginOtp ? this.loginData.email : this.signupData.email}).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token)
        this.router.navigate([''])
      },
      (error: any) => {
        this.errorMsg = error.error.retMsg
      }
    )
  }

  resendOTP(param?: string) {
    this.httpService.post('/auth/resendOTP', {email: param == 'login' ? this.loginData.otp :  this.signupData.email}).subscribe(
      (res: any) => {
        if(res.msgType == 'success') {
          this.isOtp = true;
        }
      },
      (error: any) => {
        this.errorMsg = error.error.retMsg
      }
    )
  }
}
