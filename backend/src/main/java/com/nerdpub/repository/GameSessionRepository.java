package com.nerdpub.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.GameSession;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Integer>{

    List<GameSession> findByGameId(int gameId);

    List<GameSession> findByTableId(int tableId);

    List<GameSession> findByDate(LocalDate parsedDate);

}
