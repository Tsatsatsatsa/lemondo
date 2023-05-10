import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from './services/auth.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user?: User | null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['./login']);
  }

}