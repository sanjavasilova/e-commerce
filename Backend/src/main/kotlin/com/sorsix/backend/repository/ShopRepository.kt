package com.sorsix.backend.repository

import com.sorsix.backend.model.Shop
import org.springframework.data.jpa.repository.JpaRepository

interface ShopRepository : JpaRepository<Shop, Long> {
}