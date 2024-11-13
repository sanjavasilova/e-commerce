package com.sorsix.backend.dto

data class AuthResponseDto (
    val accessToken: String,
    val tokenType: String = "Bearer ",
)