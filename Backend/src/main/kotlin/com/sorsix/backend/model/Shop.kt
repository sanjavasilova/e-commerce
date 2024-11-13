package com.sorsix.backend.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
data class Shop (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val shopId: Long,

    @Column(nullable = false)
    val name: String,

    val image: String,

    @OneToMany(mappedBy = "shop", cascade = [CascadeType.ALL], orphanRemoval = true)
    @JsonIgnore
    val shopProducts: Set<ShopProduct> = emptySet()
)