package com.nerdpub.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CustomUserDetails implements UserDetails{

    private final int userId;  
    private final String username;  
    private final String password;  
    private final Collection<? extends GrantedAuthority> authorities;
}
