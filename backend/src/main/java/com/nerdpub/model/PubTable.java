package com.nerdpub.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class PubTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)    
    private int id;
    
    private String tableName;
    private int capacity;
    private boolean isAvailable;

}
