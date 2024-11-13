package com.sorsix.backend.api

import com.sorsix.backend.model.Category
import com.sorsix.backend.service.CategoryService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/category")
class CategoryController (val service: CategoryService) {
    @GetMapping
    fun all() : List<Category>{
        return service.getAll()
    }

    @GetMapping("/{category}")
    fun getByName(@PathVariable(value = "category") category : String) : Category?{
        return service.getByName(category)
    }
}