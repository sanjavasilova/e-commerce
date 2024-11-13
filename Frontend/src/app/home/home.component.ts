import {Component, inject} from '@angular/core';
import {CartComponent} from "../cart/cart.component";
import {DropdownComponent} from "../dropdown/dropdown.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {ShowProductsComponent} from "../show-products/show-products.component";
import {StoresComponent} from "../stores/stores.component";
import {RegisterComponent} from "../register/register.component";
import {RouterLink} from "@angular/router";
import {LogoutComponent} from "../logout/logout.component";
import {HeaderComponent} from "../header/header.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CartComponent,
    DropdownComponent,
    SearchBarComponent,
    ShowProductsComponent,
    StoresComponent,
    RegisterComponent,
    RouterLink,
    LogoutComponent,
    HeaderComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
