package com.nerdpub.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
               // 1. PUBLIC: Anyone can see these
                .requestMatchers("/api/account/login", "/api/account/register").permitAll()
                .requestMatchers("/api/game-sessions/tonight/**", "/api/game-sessions/search").permitAll()
                .requestMatchers("/api/pubs/cities", "/api/games/all").permitAll()

                // 2. ADMIN ONLY: Management of core data
                .requestMatchers("/api/pubs/**").hasRole("ADMIN")
                .requestMatchers("/api/games/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/api/game-sessions/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/game-sessions/**").hasRole("ADMIN")

                // 3. MEMBER/USER: Booking and Profile
                // Note: We use .authenticated() here because the specific "Ownership" 
                // check happens in the Controller.
                .requestMatchers("/api/bookings/**").authenticated()
                .requestMatchers("/api/account/profile/**").authenticated()

                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
