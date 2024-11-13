import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "../service/login-service";
import {MatFabButton} from "@angular/material/button";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    MatFabButton
  ],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  private apiUrl = '/api/auth/logout';

  http = inject(HttpClient);
  router = inject(Router);
  loginService = inject(LoginService)

  logout() {
    this.http.post(this.apiUrl, {}).subscribe({
      next: () => {
        this.loginService.logout();
        this.router.navigate(['/home']);
      },
      error: (error) => {

      }
    });
  }
}
