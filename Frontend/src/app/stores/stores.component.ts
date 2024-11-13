import { NgClass, NgFor } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {Shop} from "../shop";
import {ShopService} from "../service/shop-service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {DropdownComponent} from "../dropdown/dropdown.component";
import {SearchBarComponent} from "../search-bar/search-bar.component";
import { ShowingProductsService } from '../service/showing-products.service';


@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass, DropdownComponent, SearchBarComponent],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.css'
})
export class StoresComponent implements OnInit{
  stores: Shop[]=[]
  selectedShop?: Shop

  service = inject(ShopService)
  activeRoute = inject(ActivatedRoute)

  ngOnInit() {

    this.service.getAllShops().subscribe(stores => {
      this.stores=stores
      this.activeRoute.paramMap.subscribe(params => {
        let shop = params.get("shop")
        if (shop){
          for (let store of this.stores) if (shop === store.name) this.selectedShop = store;
        }
      })
    })

  }

  isSelected(shop:Shop): Boolean{
    return shop.name === this.selectedShop?.name
  }

  Selected(shop: Shop)
  {
    if (this.selectedShop === shop){
      this.selectedShop = undefined
    }
    else {
      this.selectedShop = shop
    }
  }


  getRouterLink(shop: Shop): string
  {
    let valueReturn: string = ''
    this.activeRoute.paramMap.subscribe({
      next: (response) => {
        let category: string | null = response.get('category')
        let subcategory: string | null = response.get('subcategory')


        if (category === null){
          if (shop === this.selectedShop) valueReturn = '/home'
          if (shop !== this.selectedShop) valueReturn = '/shop/'+shop.name
        }
        else{
          if (shop === this.selectedShop) valueReturn = '/category-subcategory/'+ category + '/' + subcategory
          if (shop !== this.selectedShop) valueReturn = '/shop/' + shop.name + '/category-subcategory/' + category +'/'+subcategory
        }
      },
      error: (error) => {
        return '';
      }
    })
    return valueReturn
  }

}
