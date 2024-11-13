package com.sorsix.backend.model

import jakarta.persistence.*

@Entity
class ShopProduct (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @ManyToOne
    @JoinColumn(name = "shop_id", nullable = false)
    val shop: Shop,

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    val product: Product,

    @Column(nullable = false)
    val price: Double
)