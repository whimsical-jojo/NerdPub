package com.nerdpub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.PubTable;

@Repository
public interface TableRepository extends JpaRepository<PubTable, Integer>{

}
