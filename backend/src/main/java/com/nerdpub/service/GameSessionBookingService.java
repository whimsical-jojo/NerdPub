package com.nerdpub.service;

import com.nerdpub.dto.GameSessionBookingDTO;
import com.nerdpub.exception.BookingException;
import com.nerdpub.exception.TableNotAvailableException;
import com.nerdpub.mapper.GameSessionBoookingMapper;
import com.nerdpub.model.Member;
import com.nerdpub.model.PubTable;
import com.nerdpub.model.GameSession;
import com.nerdpub.model.GameSessionBooking;
import com.nerdpub.repository.MemberRepository;
import com.nerdpub.repository.GameSessionBookingRepository;
import com.nerdpub.repository.GameSessionRepository;
import com.nerdpub.repository.PubTableRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameSessionBookingService {
    @Autowired
    private GameSessionBookingRepository bookingRepository;

    @Autowired
    private GameSessionRepository sessionRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private GameSessionBoookingMapper bookingMapper;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public GameSessionBookingDTO bookTable(int sessionId, String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        GameSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found"));

        PubTable table = session.getTable();

        if (!table.isAvailable()) {
            throw new TableNotAvailableException("Table is unavailable");
        }

        // How many places are available?
        if (session.getBookedSpots() >= table.getCapacity()) {
            throw new TableNotAvailableException("Table is full");
        }

        // Has the user made any other bookings on that day?
        int numOfBookings = bookingRepository.getMembersBookingsInDate(member.getId(), session.getDate());
        if (numOfBookings > 0) {
            throw new BookingException("Cannot book more than one table per day");
        }

        GameSessionBooking booking = new GameSessionBooking();
        booking.setMember(member);
        booking.setSession(session);

        bookingRepository.save(booking);

        //This is necessary to reload the correct number of booked spots for the front end.
        entityManager.flush();
        entityManager.refresh(session);

        return bookingMapper.toDTO(booking);
    }

    public void deleteBooking(int sessionId, String name) {
        Member member = memberRepository.findByUsername(name)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        GameSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found"));

        GameSessionBooking booking = bookingRepository.findByMemberAndSession(member, session)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        sessionRepository.save(session);

        bookingRepository.delete(booking);
    }

    public List<GameSessionBookingDTO> getUserBookings(String name) {
        Member member = memberRepository.findByUsername(name)
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        return bookingMapper.toDTOs(bookingRepository.findByMember(member.getId()));
    }

}
