package com.sorsix.backend.repository

import com.sorsix.backend.model.SubCategory
import org.springframework.data.jpa.repository.JpaRepository

interface SubCategoryRepository : JpaRepository<SubCategory,Long> {
    fun getAllSubCategoriesByCategoryName(categoryName: String): List<SubCategory>
}