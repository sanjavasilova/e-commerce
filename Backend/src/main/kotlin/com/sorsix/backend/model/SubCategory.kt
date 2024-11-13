package com.sorsix.backend.model

import jakarta.persistence.*

@Entity
data class SubCategory (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    val name: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    val category: Category,

    val image: String
)