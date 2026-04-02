package com.nerdpub.model;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.Formula;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    //This has to be nullable, because sessions are preserved even if the pubs close down or the tables get deleted.
    @ManyToOne
    @JoinColumn(name = "table_id", nullable = true)
    private PubTable table;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GameSessionBooking> bookings;

    @Formula("(SELECT COUNT(*) FROM game_session_booking b WHERE b.session_id = id)")
    private int bookedSpots;
}
