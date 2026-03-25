package com.nerdpub.model;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String description;

    //List of all pubs that have this game
    @ManyToMany(cascade = {
        CascadeType.DETACH,
        CascadeType.MERGE,
        CascadeType.REFRESH,
        CascadeType.PERSIST
    }, fetch = FetchType.LAZY, mappedBy = "games")
    private List<Pub> pubs;
}
