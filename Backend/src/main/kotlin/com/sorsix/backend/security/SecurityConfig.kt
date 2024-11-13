package com.sorsix.backend.security

import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.provisioning.InMemoryUserDetailsManager
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
class SecurityConfig (val authEntryPoint: JwtAuthEntryPoint, val userDetailsService: CustomUserDetailsService){
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain{
        http.
            csrf { csrf -> csrf.disable() }
            .exceptionHandling { exceptionHandling -> exceptionHandling.authenticationEntryPoint(authEntryPoint)}
            .sessionManagement{ sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)}
            .authorizeHttpRequests { auth ->
                auth.requestMatchers(HttpMethod.GET).permitAll()
                    .requestMatchers( "/api/auth/**").permitAll()
                    .requestMatchers("/api/orders/**").authenticated()
                    .requestMatchers("/api/wish-list/**").authenticated()
                    .anyRequest().authenticated()
                }
            .httpBasic(Customizer.withDefaults())
            .logout { logout ->
                logout.logoutUrl("/api/auth/logout")
                    .logoutSuccessUrl("/login")
                    .invalidateHttpSession(true)
                    .deleteCookies("JSESSIONID")
                    .logoutSuccessHandler { _, response, _ ->
                        response.status = HttpServletResponse.SC_OK
                        response.writer.write("{\"message\": \"Logout successful\"}")
                    }
            }
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter::class.java)
        return http.build()
    }

    @Bean
    @Throws(Exception::class)
    fun authenticationManager(authenticationConfiguration: AuthenticationConfiguration): AuthenticationManager{
        return authenticationConfiguration.authenticationManager
    }

    @Bean
    fun jwtAuthenticationFilter(): JWTAuthenticationFilter {
        return JWTAuthenticationFilter()
    }
}