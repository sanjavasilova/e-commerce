package com.sorsix.backend.api

import com.sorsix.backend.model.Product
import com.sorsix.backend.service.ShopProductService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/products-in-shop")
class ShopProductController(val service: ShopProductService) {
    @GetMapping("/{shop}/products")
    fun getAllProductsInAShop(@PathVariable shop: String): List<Product> {
        return service.findAllProductsInAShop(shop)
    }
}