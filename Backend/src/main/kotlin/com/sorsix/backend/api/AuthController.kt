package com.sorsix.backend.api

import com.sorsix.backend.dto.AuthResponseDto
import com.sorsix.backend.dto.LoginDto
import com.sorsix.backend.dto.RegisterDto
import com.sorsix.backend.model.*
import com.sorsix.backend.repository.RoleRepository
import com.sorsix.backend.repository.UserRepository
import com.sorsix.backend.security.JWTGenerator
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/auth")
class AuthController(
    val authenticationManager: AuthenticationManager,
    val userRepository: UserRepository,
    val roleRepository: RoleRepository,
    val passwordEncoder: PasswordEncoder,
    val jwtGenerator: JWTGenerator
) {
    @PostMapping("login")
    fun login(@RequestBody loginDto: LoginDto): ResponseEntity<AuthResponseDto> {
        val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                loginDto.username,
                loginDto.password
            )
        )

        SecurityContextHolder.getContext().authentication = authentication
        val token = jwtGenerator.generateToken(authentication)
        return ResponseEntity(AuthResponseDto(accessToken = token), HttpStatus.OK)
    }

    @PostMapping("register")
    fun register(@RequestBody registerDto: RegisterDto): ResponseEntity<Map<String, String>> {
        if (userRepository.existsByUsername(registerDto.username)) {
            val response = mapOf("message" to "User with that username already exists")
            return ResponseEntity(response, HttpStatus.BAD_REQUEST)
        }

        if(userRepository.existsByEmail(registerDto.email)){
            val response = mapOf("message" to "User with that email already exists")
            return ResponseEntity(response, HttpStatus.BAD_REQUEST)
        }

        val role: Roles? = roleRepository.findByName("USER")
        val rolesList: List<Roles> = if (role != null) listOf(role) else emptyList()
        val user = UserEntity(
            username = registerDto.username,
            password = passwordEncoder.encode(registerDto.password),
            firstName = registerDto.firstName,
            lastName = registerDto.lastName,
            email = registerDto.email,
            roles = rolesList
        )

        userRepository.save(user)
        val response = mapOf("message" to "User registered successfully")
        return ResponseEntity(response, HttpStatus.CREATED)
    }
}