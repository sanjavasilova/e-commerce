package com.sorsix.backend.service

import com.sorsix.backend.model.Category
import com.sorsix.backend.repository.CategoryRepository
import org.springframework.stereotype.Service

@Service
class CategoryService (val repository : CategoryRepository) {
    fun getAll(): List<Category> {
        return repository.findAll()
    }

    fun getByName(name: String): Category? {
        return repository.findByName(name)
    }
}