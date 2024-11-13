import {Injectable} from "@angular/core";
import {jwtDecode} from "jwt-decode";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService{
  usernameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  username$: Observable<string | null> = this.usernameSubject.asObservable();

  constructor() {
    this.initializeUsername();
  }

  private initializeUsername() {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.usernameSubject.next(decodedToken.sub);
    } else {
      this.usernameSubject.next(null);
    }
  }
}
