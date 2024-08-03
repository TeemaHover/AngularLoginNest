import { Component } from '@angular/core';
import { AboutPageService } from './about-page.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
})
export class AboutPageComponent {
  username = '';
  fullname = '';

  constructor(private aboutPageService: AboutPageService) {}

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.aboutPageService.getUserData().subscribe(
      (data) => {
        this.username = data.username;
        this.fullname = data.fullname;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }
}
