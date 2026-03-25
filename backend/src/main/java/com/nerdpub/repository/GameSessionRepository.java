package com.nerdpub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.GameSession;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Integer>{
    
}
