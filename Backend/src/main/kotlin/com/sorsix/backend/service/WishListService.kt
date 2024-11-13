package com.sorsix.backend.service

import com.sorsix.backend.model.Product
import com.sorsix.backend.model.WishList
import com.sorsix.backend.repository.ProductRepository
import com.sorsix.backend.repository.UserRepository
import com.sorsix.backend.repository.WishListRepository
import org.springframework.stereotype.Service

@Service
class WishListService(
    val userRepository: UserRepository,
    val wishListRepository: WishListRepository,
    val productRepository: ProductRepository
) {
    fun addToWishList(product: Product, username: String) {
        val user = userRepository.findByUsername(username) ?: throw Exception("User not found")

        var wishList = wishListRepository.findByUser(user)
        if (wishList == null) {
            wishList = WishList(user = user)
        }

        if (!wishList.products.contains(product)) {
            wishList.products.add(product)

            wishListRepository.save(wishList)
        }
    }

    fun getWishListByUserName(username: String): List<Product> {
        val user = userRepository.findByUsername(username) ?: throw Exception("User not found")
        return wishListRepository.findProductsByUser(user)
    }

    fun deleteProduct(username: String, productId: Long) {
        val user = userRepository.findByUsername(username) ?: throw Exception("User not found")

        val wishList = wishListRepository.findByUser(user) ?: throw Exception("WishList not found")

        val product = productRepository.findById(productId).orElseThrow { Exception("Product not found") }

        if (wishList.products.contains(product)) {
            wishList.products.remove(product)
            wishListRepository.save(wishList)
        }
    }
}