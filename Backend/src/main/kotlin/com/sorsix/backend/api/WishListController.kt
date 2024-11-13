package com.sorsix.backend.api

import com.sorsix.backend.model.Product
import com.sorsix.backend.model.WishList
import com.sorsix.backend.service.WishListService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/wish-list")
class WishListController (val wishListService: WishListService) {
    @PostMapping
    fun addProductToWishList(@RequestParam username:String, @RequestBody product: Product){
        wishListService.addToWishList(product,username)
    }

    @GetMapping("/my-wishlist")
    fun getWishList(@RequestParam username:String): List<Product>{
        return wishListService.getWishListByUserName(username)
    }

    @DeleteMapping("/delete-product/{productId}")
    fun deleteProduct(@RequestParam username:String, @PathVariable productId: Long){
        return wishListService.deleteProduct(username, productId)
    }
}