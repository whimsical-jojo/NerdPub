package com.nerdpub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nerdpub.model.Game;

public interface GameRepository extends JpaRepository<Game, Integer>{

    List<Game> findByTitleContaining(String title);

}
