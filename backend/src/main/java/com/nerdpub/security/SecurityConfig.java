package com.nerdpub.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	//@Autowired
	//https://open.spotify.com/intl-de/album/6DmxTvjRTX1X3oMOrQiDMe?si=C_H3k6NmS0iHiZM8JZAG3A
	
    @Autowired
    private JwtAuthenticationFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disabilita CSRF per le API REST
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/account/login").permitAll()
                .requestMatchers("/api/account/register").permitAll()
                .requestMatchers("/api/game-sessions/tonight/**").permitAll()
                .requestMatchers("/api/game-sessions/search/**").permitAll()
                .requestMatchers("/api/pubs/cities").permitAll()
                .anyRequest().authenticated() // A parte il login, tutto è autenticato.
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
