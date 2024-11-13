package com.sorsix.backend.repository

import com.sorsix.backend.model.UserEntity
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository: JpaRepository<UserEntity, Long> {
    fun findByUsername(username: String): UserEntity?
    fun existsByUsername(username: String): Boolean
    fun existsByEmail(email: String): Boolean
}