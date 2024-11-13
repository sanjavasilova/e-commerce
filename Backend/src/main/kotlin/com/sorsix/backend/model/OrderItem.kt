package com.sorsix.backend.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import jakarta.validation.constraints.NotNull

@Entity
data class OrderItem(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @NotNull
    val product: Product,

    @NotNull
    val quantity: Int,

    @ManyToOne
    @NotNull
    @JsonIgnore
    val order: Orders,

    val price: Int
)
