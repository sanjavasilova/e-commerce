package com.sorsix.backend.security

import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.*
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException
import javax.crypto.SecretKey

@Component
class JWTGenerator{

    fun generateToken(authentication: Authentication): String {
        val username = authentication.name
        val currentDate = Date()
        val expirationDate = Date(currentDate.time +SecurityConstants.JWT_EXPIRATION)

        val key: SecretKey = Keys.hmacShaKeyFor(SecurityConstants.JWT_SECRET.toByteArray())

        val token = Jwts.builder()
            .setSubject(username)
            .setIssuedAt(Date())
            .setExpiration(expirationDate)
            .signWith(key,SignatureAlgorithm.HS512)
            .compact()

        return token
    }

    fun getUsernameFromToken(token: String): String {
        val key: SecretKey = Keys.hmacShaKeyFor(SecurityConstants.JWT_SECRET.toByteArray())

        val claims = Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .body

        return claims.subject
    }

    fun validateToken(token: String): Boolean {
        val key: SecretKey = Keys.hmacShaKeyFor(SecurityConstants.JWT_SECRET.toByteArray())

        try {
            val claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body

            val expirationDate = claims.expiration
            if (expirationDate.before(Date())) {
                throw AuthenticationCredentialsNotFoundException("JWT token expired")
            }

            return true
        } catch (ex: Exception) {
            throw AuthenticationCredentialsNotFoundException("JWT token expired or not valid")
        }
    }
}