package com.sorsix.backend.repository

import com.sorsix.backend.model.Roles
import org.springframework.data.jpa.repository.JpaRepository

interface RoleRepository: JpaRepository<Roles, Long>{
    fun findByName(name: String): Roles?
}