package com.nerdpub.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.TableBooking;

@Repository
public interface TableBookingRepository extends JpaRepository<TableBooking, Integer> {

    @Query("SELECT COUNT(tb) FROM TableBooking tb WHERE tb.table.id = ?1 AND tb.date = ?2")
    int getAvailableSpots(int tableId, LocalDate date);

    @Query("SELECT COUNT(tb) FROM TableBooking tb WHERE tb.member.id = ?1 AND tb.date = ?2")
    int getMembersBookingsInDate(int memberId, LocalDate date);
}
