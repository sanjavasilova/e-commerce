import {Component, inject, OnInit} from '@angular/core';
import {OrderService} from "../service/order-service";
import {Observable} from "rxjs";
import {Order} from '../order';
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {OrderItem} from "../order-item";
import {HeaderComponent} from "../header/header.component";
import {PaginationService} from "../service/paginator-service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    HeaderComponent,
    MatPaginator
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orderService = inject(OrderService)

  orders$?: Observable<Order[]>
  pageIndex: number = 0;
  pageSize: number = 5;
  paginatorService = inject(PaginationService)

  ngOnInit() {
    this.orders$ = this.orderService.getProductsOfUser()
    this.paginatorService.setPageIndex(0);
    this.paginatorService.pageIndex$.subscribe(index => this.pageIndex = index)
    this.paginatorService.pageSize$.subscribe(size => this.pageSize = size)
  }

  calculateTotalPrice(items: OrderItem[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    if (this.pageSize != event.pageSize) {
      this.pageSize = event.pageSize;
      this.paginatorService.setPageSize(this.pageSize)
    }
    this.paginatorService.setPageIndex(this.pageIndex)
  }
}
