package com.sorsix.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull

@Entity
data class Orders(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne
    @NotNull
    val user: UserEntity,

    @OneToMany(mappedBy = "order", cascade = [CascadeType.ALL], orphanRemoval = true)
    val items: MutableList<OrderItem> = mutableListOf(),

    @NotNull
    val address: String,
)
