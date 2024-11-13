package com.sorsix.backend.security

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JWTAuthenticationFilter: OncePerRequestFilter(){
    @Autowired
    private lateinit var tokenJWTGenerator: JWTGenerator
    @Autowired
    private lateinit var customUserDetailsService: CustomUserDetailsService
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val token = getJWTFromRequest(request)
        if (token != null) {
            if (StringUtils.hasText(token) && tokenJWTGenerator.validateToken(token)) {
                val username = tokenJWTGenerator.getUsernameFromToken(token)
                val userDetails = customUserDetailsService.loadUserByUsername(username)

                val authenticationToken = UsernamePasswordAuthenticationToken(userDetails, null, userDetails?.authorities)
                authenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)

                SecurityContextHolder.getContext().authentication = authenticationToken
            }
        }

        filterChain.doFilter(request, response)
    }

    private fun getJWTFromRequest(request: HttpServletRequest): String? {
        val bearerToken = request.getHeader("Authorization")
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7)
        }
        return null
    }
}