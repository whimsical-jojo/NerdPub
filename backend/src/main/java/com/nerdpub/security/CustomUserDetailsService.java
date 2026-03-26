package com.nerdpub.security;


import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.nerdpub.model.Member;
import com.nerdpub.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    MemberRepository memberRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    	//Only one query, as it should be
    	Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        
        //This should work and give me the member
        return CustomUserDetails.builder()
                .userId(member.getId())
                .username(member.getUsername())
                .password(member.getPassword())
                .authorities(Collections.singleton(new SimpleGrantedAuthority("ROLE_" + member.getRole())))
                .build(); // Mappa il ruolo (es. ADMIN, USER)
    }
}
