import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormControlName,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginPage } from './login-page';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  onSubmit() {
    const formData = this.loginForm.value;
    this.http
      .post<LoginPage>('http://localhost:3000/auth', formData)
      .subscribe((response) => {
        localStorage.setItem('authToken', response.access_token);
        this.router.navigate(['/about']);
      });
  }
}
