package com.nerdpub.service;

import com.nerdpub.repository.TableRepository;

import org.springframework.beans.factory.annotation.Autowired;

import com.nerdpub.repository.TableRepository;

@Service
public class TableBookingService {
    @Autowired
    private TableBookingRepository tableBookingRepository;

    @Autowired
    private TableRepository tableRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Transactional
    public TableBooking bookTable(TableBookingDTO bookingDto) {
        Member member = memberRepository.findById(bookingDto.getMemberId())
                .orElseThrow(() -> new ResourceNotFoundException("Member not found"));

        Table table = tableRepository.findById(bookingDto.getTableId())
                .orElseThrow(() -> new ResourceNotFoundException("Table not found"));

        if (!table.isAvailable()) {
            throw new TableNotAvailableException("Table is already booked for this time slot");
        }

        TableBooking booking = new TableBooking();
        booking.setUser(user);
        booking.setTable(table);
        booking.setBookingTime(bookingDto.getBookingTime());
        booking.setNumberOfPeople(bookingDto.getNumberOfPeople());

        table.setAvailable(false);
        tableRepository.save(table);

        return tableBookingRepository.save(booking);
    }

}
