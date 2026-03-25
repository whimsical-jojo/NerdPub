package com.nerdpub.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nerdpub.service.TableBookingService;

@RestController
@RequestMapping("np/api/bookings")
public class TableBookingAPI {
    @Autowired
    private TableBookingService tableBookingService;

    @PostMapping
    public ResponseEntity<TableBooking> createBooking(@RequestBody TableBookingDTO bookingDto) {
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
