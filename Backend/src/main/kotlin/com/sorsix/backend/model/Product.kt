package com.sorsix.backend.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
data class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val image: String,

    @OneToMany(mappedBy = "product", cascade = [CascadeType.ALL], orphanRemoval = true)
    @JsonIgnore
    val shopProducts: Set<ShopProduct> = emptySet(),

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    val category: Category,

    @ManyToOne
    @JoinColumn(name = "subcategory_id")
    val subcategory: SubCategory
){
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as Product
        return id == other.id
    }

    override fun hashCode(): Int {
        return id.hashCode()
    }
}