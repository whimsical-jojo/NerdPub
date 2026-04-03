package com.nerdpub.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.JpqlQueryBuilder.Entity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nerdpub.dto.GameSessionBookingDTO;
import com.nerdpub.exception.BookingException;
import com.nerdpub.exception.TableNotAvailableException;
import com.nerdpub.service.GameSessionBookingService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class GameSessionBookingAPI {
    @Autowired
    private GameSessionBookingService bookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody int sessionId, Authentication authentication) {
        try {
            System.out.println("User: " + authentication.getName());
            System.out.println("Authorities: " + authentication.getAuthorities());
            GameSessionBookingDTO savedBooking = bookingService.bookTable(sessionId, authentication.getName());
            return ResponseEntity.ok(savedBooking);
        } catch (TableNotAvailableException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (BookingException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @DeleteMapping("/{sessionId}")
    @PreAuthorize("hasRole('ADMIN') or @bookingService.isOwner(#sessionId, authentication.name)")
    public ResponseEntity<?> deleteBooking(@PathVariable int sessionId, Authentication authentication) {
        try {
            bookingService.deleteBooking(sessionId, authentication.getName());
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    /**
     * The purpose of this method is to allow users in the front end to be able to
     * see the sessions they have booked,
     * possibly to cancel or remind themselves of where they want to go.
     * 
     * @param authentication
     * @return A list of session ids that the user has booked (and which are not in
     *         the past)
     */
    @GetMapping("/user-bookings")
    public ResponseEntity<?> getUserBookings(Authentication authentication) {
        try {
            List<GameSessionBookingDTO> bookedSessionIds = bookingService.getUserBookings(authentication.getName());
            return ResponseEntity.ok(bookedSessionIds);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
