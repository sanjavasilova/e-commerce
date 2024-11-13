package com.sorsix.backend.repository

import com.sorsix.backend.model.Product
import com.sorsix.backend.model.ShopProduct
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ShopProductRepository : JpaRepository<ShopProduct, Long> {
    @Query("SELECT sp.product FROM ShopProduct sp WHERE sp.shop.name = :shop")
    fun findProductsInShop(shop: String) : List<Product>

    fun findByProduct(product: Product) : List<ShopProduct>
}