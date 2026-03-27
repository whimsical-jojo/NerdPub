package com.nerdpub.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.GameSession;
import com.nerdpub.model.GameSessionBooking;
import com.nerdpub.model.Member;

@Repository
public interface GameSessionBookingRepository extends JpaRepository<GameSessionBooking, Integer> {

    @Query("SELECT COUNT(b) FROM GameSessionBooking b WHERE b.session.id = ?1")
    int getOccupiedSpots(int sessionId);

    @Query("SELECT COUNT(b) FROM GameSessionBooking b WHERE b.member.id = ?1 AND b.session.date = ?2")
    int getMembersBookingsInDate(int memberId, LocalDate date);

    //There should only be one booking per member per session
    Optional<GameSessionBooking> findByMemberAndSession(Member member, GameSession session);

    @Query("SELECT b FROM GameSessionBooking b WHERE b.session.date >= CURRENT_DATE and b.member.id = ?1")
    List<GameSessionBooking> findByMember(Integer memberId);

}
