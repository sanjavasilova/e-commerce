package com.sorsix.backend.service

import com.sorsix.backend.dto.OrderDto
import com.sorsix.backend.model.Orders
import com.sorsix.backend.model.OrderItem
import com.sorsix.backend.dto.OrderItemDto
import com.sorsix.backend.repository.OrderRepository
import com.sorsix.backend.repository.ProductRepository
import com.sorsix.backend.repository.UserRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class OrderService(
    private val userRepository: UserRepository,
    private val orderRepository: OrderRepository,
    private val productRepository: ProductRepository
) {

    @Transactional
    fun placeOrder(username: String, orderDto: OrderDto) {
        val user = userRepository.findByUsername(username) ?: throw Exception("User not found")


        val order = Orders(user = user, address = orderDto.address)

        orderDto.items.forEach { itemRequest ->
            val product = productRepository.findProductByName(itemRequest.name)
            val orderItem = OrderItem(product = product, quantity = itemRequest.amount, price = itemRequest.price, order = order)
            order.items.add(orderItem)
        }

        orderRepository.save(order)
    }

    fun getOrdersByUsername(username: String): List<Orders> {
        val user = userRepository.findByUsername(username) ?: throw Exception("User not found")
        return orderRepository.findByUser(user)
    }
}