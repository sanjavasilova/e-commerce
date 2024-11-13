import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {Category} from "../category";
import {CategoryService} from "../service/category-service";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import { ShowingProductsService } from '../service/showing-products.service';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent implements OnInit {
  categories: Category[] = []
  activeRoute = inject(ActivatedRoute)
  service = inject(CategoryService)

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.service.getAllCategories().subscribe(
      categories => {
        this.categories = categories;
        this.loadAllSubcategories();
     }
    );
  }

  loadAllSubcategories(): void {
    this.categories.forEach(category => {
      this.loadSubcategories(category);
    });
  }

  loadSubcategories(category: Category): void {
    this.service.getAllSubCategoriesOfCategory(category.name).subscribe(subcategories => {
        category.subcategories = subcategories;
      }
    );
  }

  calculateRoute(category: string, subcategory: string): string
  {
    let valueReturn: string = ''
    this.activeRoute.paramMap.subscribe({
      next: (response) => {
        let shop: string | null = response.get('shop')

        if (shop) valueReturn = '/shop/' + shop +'/category-subcategory/' + category + '/' + subcategory
        else {
          
          valueReturn = '/category-subcategory/' + category + '/' + subcategory
        }
      },
      error: (error) => {
        return '';
      }
    })
    return valueReturn
  }
}
