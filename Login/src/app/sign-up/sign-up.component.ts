import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormControlName,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  signUpForm = new FormGroup({
    username: new FormControl(''),
    fullname: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    const formData = this.signUpForm.value;
    this.http
      .post('http://localhost:3000/user', formData)
      .subscribe((response) => {
        this.router.navigate(['/login']);
      });
  }
}
