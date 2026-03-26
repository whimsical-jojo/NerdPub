package com.nerdpub.model;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Data
@Entity
public class Pub {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String address;
    private String city;

    //A table can only belong to one pub
    @OneToMany (mappedBy = "pub", cascade = CascadeType.ALL)
    private List<PubTable> tables;

    //Many pubs can have many games
    @ManyToMany ( cascade = {
        CascadeType.DETACH,
        CascadeType.MERGE,
        CascadeType.REFRESH,
        CascadeType.PERSIST
    })
    @JoinTable( name = "pub_games",
                joinColumns = @JoinColumn(name = "pub_id"),
                inverseJoinColumns = @JoinColumn(name = "game_id"))
    private List<Game> games;
}
