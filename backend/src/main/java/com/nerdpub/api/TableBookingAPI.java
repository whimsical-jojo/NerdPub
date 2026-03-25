package com.nerdpub.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nerdpub.dto.TableBookingDTO;
import com.nerdpub.model.TableBooking;
import com.nerdpub.service.TableBookingService;

@RestController
@RequestMapping("np/api/bookings")
@CrossOrigin(origins = "http://localhost:4200")
public class TableBookingAPI {
    @Autowired
    private TableBookingService tableBookingService;

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody TableBookingDTO bookingDto) {
        try {
            TableBooking savedBooking = tableBookingService.bookTable(bookingDto);
            return ResponseEntity.ok(savedBooking);
        } catch (TableNotAvailableException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

}
