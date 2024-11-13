import {HttpClient} from "@angular/common/http";
import {inject, Injectable, OnInit} from "@angular/core";
import {ShopProduct} from "../shop-product";
import {Shop} from "../shop";
import {firstValueFrom} from "rxjs";
import {CartItems} from "../cartItems";
import {AmountService} from "./amount-service";
import {ShopService} from "./shop-service";

@Injectable({
  providedIn: "root"
})
export class AddToCartService {
  http = inject(HttpClient)
  shopService = inject(ShopService)
  shops: Shop[] = []
  cheapestTotalPrice: String = "Нема Производи"

  hasProductInMap = new Map<string, Boolean>
  shopProductPrice = new Map<string, number>

  constructor() {
    this.loadVariables()
  }

  cartItems: CartItems[] = [];
  totalPrice: number = 0;
  amountService = inject(AmountService)
  selectedShop?: Shop = undefined

  async addItem(name: string, image: string, amount: number) {
    let price = await this.getPrice(name)
    let showPrice: string;

    if (price === -1) showPrice = 'no product'
    else showPrice = String(price * amount)

    if (this.alreadyInCart(name, amount, price) === false) this.cartItems.push({
      name: name,
      amount: amount,
      price: +showPrice,
      image
    })
    if (price > 0) this.totalPrice += price * amount
    localStorage.setItem("cart", JSON.stringify(this.cartItems))
    this.cheapestTotalPrice = await this.getCheapestTotalPrice()
  }

  alreadyInCart(name: string, amount: number, price: number): Boolean {
    for (let item of this.cartItems) {
      if (item.name === name) {
        item.amount += amount
        item.price += price * amount
        return true
      }
    }
    return false
  }

  pricesOfProduct: ShopProduct[] = []

  async getPrice(name: string): Promise<number> {
    try {
      this.pricesOfProduct = await firstValueFrom(this.http.get<ShopProduct[]>("api/products/shops-products/" + name));

      if (this.pricesOfProduct.length === 0) {
        return -1;
      }

      let wanted: ShopProduct = this.pricesOfProduct[0];
      for (let i = 0; i < this.pricesOfProduct.length; i++) {
        if (this.selectedShop === undefined && wanted && wanted.price > this.pricesOfProduct[i].price) wanted = this.pricesOfProduct[i];
        if (this.selectedShop && this.selectedShop.name === this.pricesOfProduct[i].shop.name) {
          wanted = this.pricesOfProduct[i];
        }
      }

      if (this.selectedShop === undefined) return wanted.price
      else {
        if (wanted.shop.name == this.selectedShop.name) return wanted.price
        return -1
      }

    } catch (error) {
      return -1;
    }
  }

  cartAdd(name: string, image: string) {
    let amount = this.amountService.amounts.get(name)
    if (amount) {
      this.addItem(name, image, amount)
    }
  }

  async DeleteItem(name: String, amount: Number) {
    let newCartItems: CartItems[] = []
    let alreadyDone: Boolean = false;
    for (let i = 0; i < this.cartItems.length; i++) {
      let item = this.cartItems[i];
      if (item.name === name && item.amount === amount && alreadyDone === false) {
        alreadyDone = true;
        if (item.price) this.totalPrice -= item.price
        continue
      }
      newCartItems.push(item);
    }

    this.cartItems = newCartItems
    localStorage.setItem("cart", JSON.stringify(this.cartItems))
    this.cheapestTotalPrice = await this.getCheapestTotalPrice()
  }

  async ChangePrice(shop?: Shop) {
    this.selectedShop = shop

    let newCartItems: CartItems[] = []
    let newPrice: number = 0
    for (let i = 0; i < this.cartItems.length; i++) {
      let item: CartItems = this.cartItems[i]

      let price: number
      if (shop) price = await this.getPrice(item.name)
      else price = await this.getPrice(item.name)
      let showprice: string;

      if (price === -1) showprice = 'no product'
      else showprice = String(price * item.amount)

      newCartItems.push({name: item.name, amount: item.amount, price: +showprice, image: item.image})
      if (price > 0) newPrice += price * item.amount
    }

    this.totalPrice = newPrice
    this.cartItems = newCartItems
    localStorage.setItem("cart", JSON.stringify(this.cartItems))
  }

  async addToMap() {
    for (let product of this.cartItems) {
      if (this.hasProductInMap.get(product.name) === undefined) {

        const prices = await firstValueFrom(this.http.get<ShopProduct[]>("api/products/shops-products/" + product.name));

        this.hasProductInMap.set(product.name, true);
        for (let shopProduct of prices) {
          let key: string = shopProduct.shop.name + ":" + shopProduct.product.name
          this.shopProductPrice.set(key, shopProduct.price);
        }
      }
    }
  }

  async getCheapestTotalPrice(): Promise<String> {
    if (this.cartItems.length === 0) return "Нема Продукти"
    let cheapest: number = -1;

    await this.addToMap();

    let cheapestShop: string = '';
    for (let shop of this.shops) {
      let newCheapest: number = 0;
      for (let item of this.cartItems) {
        let key: string = shop.name + ":" + item.name
        let price = this.shopProductPrice.get(key);
        if (price) {
          newCheapest += price * item.amount
        } else {
          newCheapest = -1
          break
        }
      }

      if (cheapest === -1) {
        cheapestShop = shop.name
        cheapest = newCheapest
      }

      if (newCheapest < cheapest && newCheapest > -1) {
        cheapestShop = shop.name;
        cheapest = newCheapest;
      }
    }


    if (cheapest == -1) return "Ги нема производите во една продавница";

    return 'Најевтино во ' + cheapestShop + "  " + String(cheapest) + ".00";
  }

  canBuy(item: CartItems): Boolean {
    for (let product of this.cartItems) {
      if (item.name === product.name) {
        if (product.price) return false
        return true
      }
    }
    return true
  }

  canBuyAllItems(): Boolean {
    for (let item of this.cartItems) {
      if (item.price) continue
      return true
    }
    return false
  }

  async cartAddOneItem(name: string, image: string, amount = 1) {
    let price = await this.getPrice(name)

    for (let item of this.cartItems) {
      if (item.name === name) {
        item.amount += amount
        item.price = price * item.amount
      }
    }

    if (price > 0) this.totalPrice += price * amount

    this.cheapestTotalPrice = await this.getCheapestTotalPrice()
  }

  async RemoveOneItem(name: string, amount: number = 1) {
    let price = await this.getPrice(name)
    for (let item of this.cartItems) {
      if (item.name === name) {
        item.amount -= amount
        this.totalPrice -= price
        item.price = price * item.amount
        if (item.amount <= 0) {
          this.DeleteItem(name, item.amount)
          return
        }
      }
    }
    this.getCheapestPriceOnInit()
  }

  async getCheapestPriceOnInit() {
    this.cheapestTotalPrice = await this.getCheapestTotalPrice()
  }

  private totalPriceOnInit() {
    this.totalPrice = 0
    this.cartItems.forEach(item => {
      this.totalPrice += item.price * item.amount
    })
  }

  loadVariables() {
    let cart = localStorage.getItem("cart")
    if (cart != null)
      this.cartItems = JSON.parse(cart)
    else{
      this.cartItems = []
    }
    this.shopService.getAllShops().subscribe(shops => {
      this.shops = shops
    })
    this.getCheapestPriceOnInit()
    this.totalPriceOnInit()
  }
}
