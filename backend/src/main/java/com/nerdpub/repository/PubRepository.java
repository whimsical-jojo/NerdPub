package com.nerdpub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nerdpub.model.Pub;

public interface PubRepository extends JpaRepository<Pub, Integer> {

    List<Pub> findByCity(String city);

    @Query("SELECT DISTINCT p.city FROM Pub p")
    List<String> getCities();
    
}
