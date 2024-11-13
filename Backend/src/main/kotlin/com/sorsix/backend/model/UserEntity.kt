package com.sorsix.backend.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

@Entity
@Table(name = "users")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @NotBlank
    val username: String = "",
    @NotBlank
    val firstName: String = "",
    @NotBlank
    val lastName: String = "",
    @NotBlank
    @Email
    val email: String = "",
    @NotBlank
    @Size(min = 6)
    val password: String = "",

    @ManyToMany(fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
    @JoinTable(
        name = "user_roles",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "role_id", referencedColumnName = "id")]
    )
    val roles: List<Roles> = emptyList(),

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    val orders: List<Orders> = mutableListOf()

)