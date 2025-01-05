import { Component, input } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {passwordMatchValidator} from '../../utils/validators.util';
import {UserService} from '../../services/user.service';
import {LoginDTO} from '../../dtos/login.dto';
import {RegisterDTO} from '../../dtos/register.dto';
import { TokenService } from '../../services/token.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
  RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  typeAuth = input<string>( "", {alias: 'type-auth'});

  loginForm: FormGroup;

  registerForm : FormGroup;

  constructor(
    private userService : UserService,
    private tokenService : TokenService,
    private router :Router,
    private localStorageService : LocalStorageService,
    private fb : FormBuilder
  ){
    this.loginForm = this.fb.group({
      email : new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.registerForm = this.fb.group({
      name: new FormControl('',  Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, {validators: passwordMatchValidator()});
  }


  getFieldError(fieldName : string) : string {
    const control = this.registerForm.get(fieldName);
    if(control && control.touched && control.invalid) {
      if(control.errors?.['required']) {
        return 'Trường này là bắt buộc';
      }
      if(control.errors?.['email']) {
        return 'Email không hợp lệ';
      }
      if(control.errors?.['minlength']) {
        return 'Mật khẩu phải ít nhất 6 ký tự';
      }
    }
    return '';
  }

  onSubmit(): void {
    if( this.typeAuth() === 'login' && this.loginForm.valid ) {
      const loginDTO : LoginDTO = new LoginDTO(this.loginForm.value);
      this.userService.login$(loginDTO).subscribe({
        next: (response : any) => {
          this.tokenService.set(response.access_token.replace(/^"(.*)"$/, '$1'));
          this.localStorageService.save('userId', this.tokenService.payload().user_id.replace(/^"(.*)"$/, '$1'));
          if(this.tokenService.isValid() && this.tokenService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/homepage']);
          }
          console.log("login success");
        },
        error: (error : any) => {
          console.error('Error:', error);
        }
      });
    } else if ( this.typeAuth() === 'register' && this.registerForm.valid ) {
      const registerDTO : RegisterDTO = new RegisterDTO(this.registerForm.value);
      this.userService.register$(registerDTO).subscribe({
        next: (response : any) => {
          this.router.navigate(['/auth/login']);
          console.log("register success");
        },
        error: (error : any) => {
          console.error('Error:', error);
        }
      })
    }
  }
}
