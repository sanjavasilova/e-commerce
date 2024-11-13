package com.sorsix.backend.model

import jakarta.persistence.*

@Entity
data class Category (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    val name: String
)
