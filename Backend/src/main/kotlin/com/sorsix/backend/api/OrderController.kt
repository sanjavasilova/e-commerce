package com.sorsix.backend.api

import com.sorsix.backend.dto.OrderDto
import com.sorsix.backend.dto.OrderItemDto
import com.sorsix.backend.model.Orders
import com.sorsix.backend.service.OrderService
import org.springframework.web.bind.annotation.*
import java.util.Objects

@RestController
@RequestMapping("/api/orders")
class OrderController(
    private val orderService: OrderService
) {

    @PostMapping
    fun placeOrder(
        @RequestParam username: String,
        @RequestBody order: OrderDto
    ) {
        orderService.placeOrder(username, order)
    }

    @GetMapping("/order-history")
    fun getOrdersByUsername(@RequestParam username: String): List<Orders> {
        return orderService.getOrdersByUsername(username)
    }
}
