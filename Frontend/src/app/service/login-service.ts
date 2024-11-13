import {inject, Injectable} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {jwtDecode, JwtPayload } from "jwt-decode";
import {Router} from "@angular/router";
import {AuthService} from "./auth-service";
import {AddToCartService} from "./add-to-cart-service";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  loggedIn$ = this.loggedInSubject.asObservable();
  private tokenCheckInterval: any;
  addToCartService = inject(AddToCartService)
  router = inject(Router)
  authService = inject(AuthService)

  constructor() {
    this.startTokenExpirationCheck();
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.loggedInSubject.next(true);
    this.addToCartService.loadVariables()
    let username = jwtDecode(token).sub
    if(username != undefined) {
      this.authService.usernameSubject.next(username)
    }
    this.startTokenExpirationCheck();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedInSubject.next(false);
    this.authService.usernameSubject.next(null)
    localStorage.removeItem("cart")
    this.addToCartService.loadVariables()
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
    this.router.navigate(['/home'])
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) {
      return false;
    }
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      const expiryDate = new Date(decodedToken.exp * 1000);
      return expiryDate > new Date();
    }
    return false;
  }

  private decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      return null;
    }
  }

  private startTokenExpirationCheck(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
    this.tokenCheckInterval = setInterval(() => {
      if (!this.isAuthenticated()) {
        this.logout();
      }
    }, 1000 * 60);
  }
}
