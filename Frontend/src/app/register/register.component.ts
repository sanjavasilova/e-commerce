import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {catchError, finalize, tap} from 'rxjs';
import {AuthService} from '../service/auth-service';
import {NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    HeaderComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  http = inject(HttpClient);
  router = inject(Router);
  usernameError: string | null = null;
  serverError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {validators: this.passwordMatchValidator()});
  }

  ngOnInit() {
    this.registerForm.valueChanges.subscribe(() => this.serverError = null);
    this.registerForm.statusChanges.subscribe(() => this.serverError = null);
  }

  passwordMatchValidator() {
    return (formGroup: FormGroup) => {
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        formGroup.get('confirmPassword')?.setErrors({passwordMismatch: true});
      } else {
        formGroup.get('confirmPassword')?.setErrors(null);
      }
    };
  }

  @ViewChild('registerButton') registerButton!: ElementRef<HTMLButtonElement>;


  onSubmit() {
    if (this.registerForm.valid) {
      const registerData = this.registerForm.value;
      this.registerButton.nativeElement.disabled = true

      this.http.post('/api/auth/register', registerData).pipe(
        tap(response => {
          this.router.navigate(['/login']);
        }),
        catchError(error => {
          this.serverError = error.error.message;

          throw error;
        }),
        finalize(() => {
        })
      ).subscribe();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
