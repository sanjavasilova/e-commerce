package com.sorsix.backend.service

import ch.qos.logback.core.util.StringUtil.capitalizeFirstLetter
import com.sorsix.backend.model.Product
import com.sorsix.backend.repository.ShopProductRepository
import org.springframework.stereotype.Service

@Service
class ShopProductService(val repository: ShopProductRepository) {
    fun findAllProductsInAShop(shop: String): List<Product> {
        return repository.findProductsInShop(capitalizeFirstLetter(shop))
    }
}