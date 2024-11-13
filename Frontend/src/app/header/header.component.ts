import {Component, inject, OnInit} from '@angular/core';
import {DropdownComponent} from "../dropdown/dropdown.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import {StoresComponent} from "../stores/stores.component";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {LogoutComponent} from "../logout/logout.component";
import {LoginService} from "../service/login-service";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from "../service/auth-service";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import { AddToCartService } from '../service/add-to-cart-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DropdownComponent,
    SearchBarComponent,
    StoresComponent,
    RouterLink,
    AsyncPipe,
    LogoutComponent,
    MatIconModule,
    MatButtonModule,
    MatMenuTrigger,
    MatMenu,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  loginService = inject(LoginService)
  authService = inject(AuthService)
  cartService = inject(AddToCartService)
  showStores: boolean = true;
  showCart: boolean = true;

  route = inject(ActivatedRoute)

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.showStores = data['showStores'];
      this.showCart = data['showCart']
    });
  }
}
