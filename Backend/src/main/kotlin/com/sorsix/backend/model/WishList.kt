package com.sorsix.backend.model

import jakarta.persistence.*
import jakarta.validation.constraints.NotNull

@Entity
data class WishList (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @OneToOne
    @JoinColumn(name = "user_id")
    @NotNull
    val user: UserEntity,

    @ManyToMany
    @JoinTable(
        name = "wishlist_product",
        joinColumns = [JoinColumn(name = "wishlist_id")],
        inverseJoinColumns = [JoinColumn(name = "product_id")]
    )
    val products: MutableList<Product> = mutableListOf(),
)