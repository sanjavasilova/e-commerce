package com.sorsix.backend.dto

data class RegisterDto (
    val username: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String
)