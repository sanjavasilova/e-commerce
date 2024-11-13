package com.sorsix.backend.dto


data class OrderDto (
    val items: List<OrderItemDto>,
    val address: String
)