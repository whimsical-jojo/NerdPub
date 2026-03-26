package com.nerdpub.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class PubTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private int id;
    
    private String name;
    private int capacity;
    private boolean available;

    @ManyToOne (cascade = {
        CascadeType.DETACH,
        CascadeType.MERGE,
        CascadeType.REFRESH,
        CascadeType.PERSIST
    })
    @JoinColumn(name = "pub_id")
    private Pub pub;
}
