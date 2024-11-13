package com.sorsix.backend.repository

import com.sorsix.backend.model.Orders
import com.sorsix.backend.model.UserEntity
import org.springframework.data.jpa.repository.JpaRepository

interface OrderRepository: JpaRepository<Orders, Long> {
    fun findByUser(user: UserEntity): List<Orders>
}