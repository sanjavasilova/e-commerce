import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthNotLoggedIn implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem("authToken")){
      this.router.navigate(['/home'])
      return false
    }
    else{
      return true
    }
  }
}
