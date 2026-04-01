package com.nerdpub.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.PubTable;

@Repository
public interface PubTableRepository extends JpaRepository<PubTable, Integer>{

    List<PubTable> findByNameContaining(String name);

    List<PubTable> findByPubId(int id);

    @Query("SELECT t FROM PubTable t WHERE t.pub.id = ?1 AND t.id NOT IN (SELECT s.table.id FROM GameSession s WHERE s.date = ?2)")
    List<PubTable> findAvailableTablesByPubId(int id, LocalDate parsedDate);

}
