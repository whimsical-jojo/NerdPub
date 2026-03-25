package com.nerdpub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class GameTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
}
