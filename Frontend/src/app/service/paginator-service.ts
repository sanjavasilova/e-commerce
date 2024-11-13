import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private pageIndexSubject = new BehaviorSubject<number>(0);
  pageIndex$ = this.pageIndexSubject.asObservable();

  private pageSizeSubject = new BehaviorSubject<number>(10);
  pageSize$ = this.pageSizeSubject.asObservable();

  constructor() {}

  setPageIndex(index: number): void {
    this.pageIndexSubject.next(index);
  }

  setPageSize(size: number): void {
    this.pageSizeSubject.next(size);
    this.pageIndexSubject.next(0)
  }

  getPaginationParams() {
    return {
      pageIndex: this.pageIndexSubject.value,
      pageSize: this.pageSizeSubject.value,
    };
  }
}
