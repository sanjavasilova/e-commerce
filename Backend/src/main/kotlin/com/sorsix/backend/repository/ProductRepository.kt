package com.sorsix.backend.repository

import com.sorsix.backend.model.Product
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface ProductRepository : JpaRepository<Product,Long> {
    fun findProductsByCategoryName(category: String): List<Product>
    fun findProductByCategoryNameAndSubcategoryName(category: String,subCategory: String): List<Product>
    fun findProductByName(name: String): Product
    @Query("SELECT p FROM Product p LEFT JOIN p.subcategory s WHERE s.name = :subCategory")
    fun findProductsBySubcategoryName(subCategory: String): List<Product>
    fun findByNameContainsIgnoreCase(name: String): List<Product>
}