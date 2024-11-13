import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from './login-service';
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  loginService = inject(LoginService)
  router = inject(Router)

  async canActivate(): Promise<boolean> {
    const loggedIn = await firstValueFrom(this.loginService.loggedIn$);
    if (loggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
