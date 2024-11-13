import {Component, inject, OnInit} from '@angular/core';
import {Subcategory} from "../subcategory";
import {SubcategoryService} from "../service/subcategory-service";
import {Observable} from "rxjs";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PaginationService} from "../service/paginator-service";

@Component({
  selector: 'app-show-subcategories-of-category',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLinkActive,
    RouterLink,
    HeaderComponent,
    MatPaginator
  ],
  templateUrl: './show-subcategories-of-category.component.html',
  styleUrl: './show-subcategories-of-category.component.css'
})
export class ShowSubcategoriesOfCategoryComponent implements OnInit{
  subcategories$ ?: Observable<Subcategory[]>
  service = inject(SubcategoryService)
  activeRoute = inject(ActivatedRoute)
  name : string | null = null
  paginatorService = inject(PaginationService)
  pageIndex: number = 0;
  pageSize: number = 10;

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      this.name = params.get("category")
      if (this.name)
        this.subcategories$ = this.service.getSubcategoriesByCategory(this.name)
    })
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
}
