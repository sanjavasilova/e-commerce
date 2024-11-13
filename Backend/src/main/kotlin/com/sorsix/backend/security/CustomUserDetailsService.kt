package com.sorsix.backend.security

import com.sorsix.backend.model.Roles
import com.sorsix.backend.repository.UserRepository
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.stream.Collectors

@Service
class CustomUserDetailsService (val repository: UserRepository): UserDetailsService{
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails?{
        val user = repository.findByUsername(username)
        if (user != null){
            return User(user.username, user.password, mapRolesToAuthorities(user.roles))
        }
        else throw UsernameNotFoundException(username)
    }

    fun mapRolesToAuthorities(roles: List<Roles>): Collection<GrantedAuthority>{
        return roles.stream().map { SimpleGrantedAuthority(it.name) }.collect(Collectors.toList())
    }
}