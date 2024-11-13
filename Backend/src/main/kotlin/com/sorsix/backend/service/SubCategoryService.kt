package com.sorsix.backend.service

import ch.qos.logback.core.util.StringUtil.capitalizeFirstLetter
import com.sorsix.backend.model.SubCategory
import com.sorsix.backend.repository.SubCategoryRepository
import org.springframework.stereotype.Service

@Service
class SubCategoryService (val repository: SubCategoryRepository) {
    fun findAll(): List<SubCategory> {
        return repository.findAll()
    }

    fun findSubCategoriesByCategory(name: String): List<SubCategory> {
        return repository.getAllSubCategoriesByCategoryName(capitalizeFirstLetter(name))
    }
}