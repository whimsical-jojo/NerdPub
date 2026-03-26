package com.nerdpub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.nerdpub.model.Pub;

public interface PubRepository extends JpaRepository<Pub, Integer> {

    List<Pub> findByCity(String city);
    
}
