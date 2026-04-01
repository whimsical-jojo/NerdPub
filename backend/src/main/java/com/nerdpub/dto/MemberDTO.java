package com.nerdpub.dto;

import java.time.LocalDate;

import com.nerdpub.model.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {
    private int id;
    
    private String firstName;
    private String lastName;

    private String email;
    private String username;
    //This field is only SENT for account creation, and never returned to the client
    private String password;
    private Role role;

    private LocalDate dob;
    private boolean banned;
}
