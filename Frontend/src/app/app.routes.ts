import {Routes} from '@angular/router';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {HomeComponent} from "./home/home.component";
import {
  ShowSubcategoriesOfCategoryComponent
} from "./show-subcategories-of-category/show-subcategories-of-category.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {CardDetailsComponent} from "./card-details/card-details.component";
import {AuthGuard} from "./service/auth-guard";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {WishListComponent} from "./wish-list/wish-list.component";
import { ShopService } from './service/shop-service';
import { ShowProductsComponent } from './show-products/show-products.component';
import {CartComponent} from "./cart/cart.component";
import {AuthNotLoggedIn} from "./service/auth-not-logged-in";

export const routes: Routes = [
  {
    path: 'product-details/:category/:subcategory/:name',
    component: ProductDetailsComponent,
    data: { showStores: true, showCart: true }
  },
  {
    path: 'category-subcategory/:category/:subcategory',
    component: ShowProductsComponent,
    data: { showStores: true, showCart: true }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { showStores: true, showCart: true }
  },
  {
    path: 'category/:category',
    component: ShowSubcategoriesOfCategoryComponent,
    data: { showStores: true, showCart: true }
  },
  {
    path: 'shop/:shop',
    component: ShowProductsComponent,
    data: { showStores: true, showCart: true }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthNotLoggedIn],
    data: { showStores: false, showCart: false }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthNotLoggedIn],
    data: { showStores: false, showCart: false }
  },
  {
    path: 'place-order',
    component: CardDetailsComponent,
    canActivate: [AuthGuard],
    data: { showStores: true, showCart: false }
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
    data: { showStores: false, showCart: true }
  },
  {
    path: 'wishlist',
    component: WishListComponent,
    canActivate: [AuthGuard],
    data: { showStores: false, showCart: true }
  },
  {
    path: 'shop/:shop/category-subcategory/:category/:subcategory',
    component: ShowProductsComponent,
    data: { showStores: true, showCart: true }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { showStores: false, showCart: false }
  },
  {
    path: '**',
    redirectTo: '/home',
    data: { showStores: true, showCart: true }
  },
];
