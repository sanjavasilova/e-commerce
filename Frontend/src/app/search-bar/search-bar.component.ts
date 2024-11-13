import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product-service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { debounce, debounceTime, distinct, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, ReactiveFormsModule,RouterLink],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit {
  query = new FormControl()
  products$: Observable<Product[]>;

  constructor(private service: ProductService){
    this.products$ = new Observable<Product[]>()
  }

  ngOnInit()
  {
    this.products$ = this.query.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name => this.service.getAllProductsWithPrefix(name))
    )
  }
}
