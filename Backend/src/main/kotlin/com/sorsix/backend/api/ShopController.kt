package com.sorsix.backend.api

import com.sorsix.backend.model.Shop
import com.sorsix.backend.service.ShopService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/shops")
class ShopController (val service: ShopService) {
    @GetMapping
    fun getShops(): List<Shop> {
        return service.getAllShops()
    }
}