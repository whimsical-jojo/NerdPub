package com.nerdpub.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.GameSessionBooking;

@Repository
public interface GameSessionBookingRepository extends JpaRepository<GameSessionBooking, Integer> {

    @Query("SELECT COUNT(b) FROM GameSessionBooking b WHERE b.session.id = ?1")
    int getOccupiedSpots(int sessionId);

    @Query("SELECT COUNT(b) FROM GameSessionBooking b WHERE b.member.id = ?1 AND b.session.date = ?2")
    int getMembersBookingsInDate(int memberId, LocalDate date);

}
