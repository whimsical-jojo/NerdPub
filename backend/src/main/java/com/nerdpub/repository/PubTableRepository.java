package com.nerdpub.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.PubTable;

@Repository
public interface PubTableRepository extends JpaRepository<PubTable, Integer>{

    List<PubTable> findByNameContaining(String name);

}
