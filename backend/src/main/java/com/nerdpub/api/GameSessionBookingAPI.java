package com.nerdpub.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.JpqlQueryBuilder.Entity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    public ResponseEntity<?> createBooking(@RequestBody GameSessionBookingDTO bookingDto) {
        try {
            GameSessionBookingDTO savedBooking = bookingService.bookTable(bookingDto);
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

}
