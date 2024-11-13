package com.sorsix.backend.service

import com.sorsix.backend.model.Shop
import com.sorsix.backend.repository.ShopRepository
import org.springframework.stereotype.Service

@Service
class ShopService (val repository : ShopRepository) {
    fun getAllShops(): List<Shop> = repository.findAll()
}