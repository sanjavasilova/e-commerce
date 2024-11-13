import {CurrencyPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {AddToCartService} from '../service/add-to-cart-service';
import {ShopService} from '../service/shop-service';
import {Shop} from '../shop';
import {LoginService} from "../service/login-service";
import {Router, RouterLink} from "@angular/router";
import {CartItems} from "../cartItems";
import {jwtDecode} from "jwt-decode";
import {HeaderComponent} from "../header/header.component";
import {AmountService} from "../service/amount-service";
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, HeaderComponent, CurrencyPipe, RouterLink, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  showCart: Boolean = false
  stores: Shop[] = []
  service = inject(AddToCartService)
  shopService = inject(ShopService)
  loginService = inject(LoginService)
  router = inject(Router)
  username: string = ""
  selectedShop?: Shop = undefined
  amountService = inject(AmountService);

  ngOnInit() {
    this.shopService.getAllShops().subscribe(stores => {
      this.stores = stores
    })
  }
  areCartItemsValid(items: CartItems[]): boolean {
    return items.every(item => this.isValidPrice(item.price));
  }

  isValidPrice(price: any): boolean {
    return !isNaN(price) && typeof price === 'number' && price > 0;
  }

  buyItems() {
    this.loginService.loggedIn$.subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/login']);
      } else {
        if (this.areCartItemsValid(this.service.cartItems) && this.service.cartItems.length > 0) {
          this.router.navigate(['/place-order'])
        } else {
          alert('Invalid order')
        }
      }
    });
  }

  DeleteItem(name: String, amount: Number) {
    this.service.DeleteItem(name, amount)
  }

  ChangePrice(shop?: Shop) {
    this.selectedShop = shop
    this.service.ChangePrice(shop)
  }

  isStoreSelected(store?: Shop){
    return store === this.selectedShop
  }

  isItemInList(item: CartItems){
    return this.service.canBuy(item)
  }
  canBuyAllItems(){
    return this.service.canBuyAllItems();
  }
}
