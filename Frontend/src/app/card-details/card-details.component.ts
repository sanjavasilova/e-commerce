import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {CartItems} from "../cartItems";
import {AddToCartService} from "../service/add-to-cart-service";
import {HttpClient} from "@angular/common/http";
import {catchError, finalize, switchMap, tap, throwError} from "rxjs";
import {AuthService} from "../service/auth-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  service = inject(AddToCartService)
  cardForm: FormGroup;
  http = inject(HttpClient)
  authService = inject(AuthService)
  router = inject(Router)

  constructor(private fb: FormBuilder) {
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardHolder: ['', [Validators.required]],
      expiryMonth: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])$/)]],
      expiryYear: ['', [Validators.required, Validators.pattern(/^\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      address: ['', [Validators.required]]
    }, {validators: this.cardExpiryValidator()});
  }

  placeOrder(items: CartItems[]) {
    const address = this.cardForm.value.address;
    return this.authService.username$.pipe(
      switchMap(username => {
        if (typeof username === 'string') {
          return this.http.post<CartItems[]>(`/api/orders?username=${username}`, { items, address });
        } else {
          // Handle the case where username is not a string
          return throwError('Invalid username');
        }
      })
    );
  }

  onSubmit() {
    if (this.cardForm.valid) {
      this.placeOrder(this.service.cartItems).pipe(
        tap(response => {
          this.router.navigate(['/home']);
          localStorage.removeItem("cart")
          this.service.cartItems.splice(0, this.service.cartItems.length);
          this.service.cheapestTotalPrice = "No Items";
          this.service.totalPrice = 0;
        }),
        catchError(error => {
          return throwError(error);
        })
      ).subscribe();
    } else {
    }
  }


  cardExpiryValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const expiryMonth = control.get('expiryMonth')?.value;
      const expiryYear = control.get('expiryYear')?.value;

      if (expiryMonth && expiryYear) {
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;

        if (expiryYear < currentYear || (expiryYear == currentYear && expiryMonth < currentMonth)) {
          return {expired: true};
        }
      }
      return null;
    };
  }

}
