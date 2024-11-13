package com.sorsix.backend.api

import com.sorsix.backend.model.Product
import com.sorsix.backend.model.ShopProduct
import com.sorsix.backend.service.ProductService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/products")
class ProductsController (val service: ProductService) {
    @GetMapping
    fun all() : List<Product> {
        return service.getAll()
    }

    @GetMapping("/category/{category}")
    fun getProductsByCategory(@PathVariable category: String) : List<Product> {
        return service.getProductsByCategory(category)
    }
    @GetMapping("/{category}/{subcategory}")
    fun getProductsBySubCategory(@PathVariable category: String, @PathVariable subcategory: String) : List<Product> {
        return service.getAllBySubcategory(category, subcategory)
    }
    @GetMapping("/product/{productName}")
    fun getProductByProductName(@PathVariable productName: String) : Product{
        return service.getProductByName(productName)
    }
    @GetMapping("/shops-products/{productName}")
    fun getShopProductByProductName(@PathVariable productName: String) : List<ShopProduct> {
        return service.getShopProductsForProduct(productName)
    }
    @GetMapping("{subcategory}/products")
    fun getProductsBySubCategory(@PathVariable subcategory: String) : List<Product> {
        return service.getProductsBySubcategory(subcategory)
    }
    @GetMapping("starting-with/{productName}")
    fun startingWithProductName(@PathVariable productName: String) : List<Product>{
        return service.getProductsStartingWithName(productName)
    }
}