import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginService} from "../service/login-service";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    HeaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  private apiUrl = '/api/auth/login';
  http = inject(HttpClient)
  router = inject(Router)
  loginService = inject(LoginService)
  loginForm: FormGroup
  serverError: string | null = null

  ngOnInit() {
    this.loginForm.valueChanges.subscribe(()=>this.serverError=null)
    this.loginForm.statusChanges.subscribe(()=>this.serverError=null)
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  @ViewChild('loginButton') loginButton!: ElementRef<HTMLButtonElement>;

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value
      this.loginButton.nativeElement.disabled = true

      this.http.post(this.apiUrl, loginData)
        .subscribe({
          next: (response: any) => {
            this.loginService.login(response.accessToken);
            this.router.navigate(['/home']);
          },
          error: (error) => {
            this.serverError = "Корисничкото име или лозинката се неточни"
          }
        });
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
