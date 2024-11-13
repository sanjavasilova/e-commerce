package com.sorsix.backend.service

import ch.qos.logback.core.util.StringUtil.capitalizeFirstLetter
import com.sorsix.backend.model.Product
import com.sorsix.backend.model.ShopProduct
import com.sorsix.backend.repository.ShopProductRepository
import com.sorsix.backend.repository.ProductRepository
import org.springframework.stereotype.Service

@Service
class ProductService(val productRepository: ProductRepository, val shopProductRepository: ShopProductRepository) {
    fun getAll(): List<Product> {
        return productRepository.findAll()
    }

    fun getProductsByCategory(category: String): List<Product> {
        return productRepository.findProductsByCategoryName(capitalizeFirstLetter(category))
    }
    fun getProductsBySubcategory(subcategory: String): List<Product> {
        return productRepository.findProductsBySubcategoryName(capitalizeFirstLetter(subcategory))
    }

    fun getProductByName(name: String): Product {
        return productRepository.findProductByName(capitalizeFirstLetter(name))
    }

    fun getAllBySubcategory(category: String, subcategory: String): List<Product> {
        return productRepository.findProductByCategoryNameAndSubcategoryName(
            capitalizeFirstLetter(category),
            capitalizeFirstLetter(subcategory)
        )
    }

    fun getShopProductsForProduct (productName: String): List<ShopProduct> {
        return shopProductRepository.findByProduct(getProductByName(capitalizeFirstLetter(productName)))
    }

    fun getProductsStartingWithName(name: String): List<Product> {
        return productRepository.findByNameContainsIgnoreCase(name)
    }
}