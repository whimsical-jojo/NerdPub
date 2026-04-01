package com.nerdpub.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String firstName;
    private String lastName;

    private String email;
    private String username;
    private String password;
    //Default role is member
    private Role role = Role.MEMBER;

    private LocalDate dob;
    //By default users are not banned if not specified
    private boolean banned = false;
}
