import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormControlName,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { json } from 'stream/consumers';
import { LoginPage } from './login-page';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(private http: HttpClient, private authService: AuthService) {}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit() {
    const formData = this.loginForm.value;
    this.http
      .post<LoginPage>('http://localhost:3000/login/login', formData)
      .subscribe((response) => {
        console.log(response);
        console.log(this.authService.decodeToken(response.access_token));
      });
  }

  decoded_token = 'token';
}
