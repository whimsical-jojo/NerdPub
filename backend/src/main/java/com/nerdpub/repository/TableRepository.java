package com.nerdpub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.Table;

@Repository
public interface TableRepository extends JpaRepository<Table, Integer>{

}
