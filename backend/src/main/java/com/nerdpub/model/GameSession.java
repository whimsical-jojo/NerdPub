package com.nerdpub.model;

import java.time.LocalDate;

import org.hibernate.annotations.Formula;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "table_id")
    private PubTable table;

    @Formula("(SELECT COUNT(*) FROM game_session_booking b WHERE b.session_id = id)")
    private int bookedSpots;
}
