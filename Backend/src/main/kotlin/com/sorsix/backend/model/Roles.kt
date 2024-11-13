package com.sorsix.backend.model

import jakarta.persistence.*

@Entity
data class Roles (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id : Long,

    val name : String,
)