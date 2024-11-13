package com.sorsix.backend.repository

import com.sorsix.backend.model.Product
import com.sorsix.backend.model.UserEntity
import com.sorsix.backend.model.WishList
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query

interface WishListRepository: JpaRepository<WishList, Long> {
    @Query("SELECT w.products FROM WishList w WHERE w.user = :user")
    fun findProductsByUser(user: UserEntity): List<Product>
    fun findByUser(user: UserEntity): WishList?

}