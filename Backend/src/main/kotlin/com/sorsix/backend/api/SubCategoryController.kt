package com.sorsix.backend.api

import com.sorsix.backend.model.SubCategory
import com.sorsix.backend.service.SubCategoryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/subcategory")
class SubCategoryController (val service: SubCategoryService) {
    @GetMapping
    fun all() : List<SubCategory> {
        return service.findAll()
    }
    @GetMapping("/{name}")
    fun getSubCategoriesOfCategory(@PathVariable("name") name : String) : List<SubCategory> {
        return service.findSubCategoriesByCategory(name)
    }
}