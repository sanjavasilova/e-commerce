import { Component, inject, OnInit } from '@angular/core';
import { WishListService } from '../service/wish-list-service';
import {catchError, finalize, Observable, Subject, tap } from 'rxjs';
import { Product } from '../product';
import { AsyncPipe } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {PaginationService} from "../service/paginator-service";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {AddToCartService} from "../service/add-to-cart-service";
import {AmountService} from "../service/amount-service";

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [
    AsyncPipe,
    HeaderComponent,
    MatPaginatorModule,
    RouterLinkActive,
    RouterLink,
    MatIcon
  ],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  wishListService = inject(WishListService);
  products$?: Observable<Product[]> = this.wishListService.getWishListProducts();
  wishListChanged$ = new Subject<void>();
  paginatorService = inject(PaginationService)
  pageIndex: number = 0;
  pageSize: number = 10;
  addToCartService = inject(AddToCartService)
  amountService = inject(AmountService)

  ngOnInit() {
    this.wishListChanged$.subscribe(() => {
      this.products$ = this.wishListService.getWishListProducts();
    });
    this.paginatorService.setPageIndex(0);
    this.paginatorService.pageIndex$.subscribe(index => this.pageIndex = index)
    this.paginatorService.pageSize$.subscribe(size => this.pageSize = size)
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    if(this.pageSize != event.pageSize) {
      this.pageSize = event.pageSize;
      this.paginatorService.setPageSize(this.pageSize)
    }
    this.paginatorService.setPageIndex(this.pageIndex)
  }

  removeFromWishList(productId: number) {
    this.wishListService.removeProduct(productId).pipe(
      tap(response => {
      }),
      catchError(error => {
        throw error;
      }),
      finalize(() => {
        this.wishListChanged$.next();
      })
    ).subscribe();
  }
}
