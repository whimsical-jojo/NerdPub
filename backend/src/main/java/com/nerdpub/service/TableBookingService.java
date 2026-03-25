package com.nerdpub.service;

import com.nerdpub.dto.TableBookingDTO;
import com.nerdpub.exception.TableNotAvailableException;
import com.nerdpub.mapper.TableBoookingMapper;
import com.nerdpub.model.Member;
import com.nerdpub.model.Table;
import com.nerdpub.model.TableBooking;
import com.nerdpub.repository.MemberRepository;
import com.nerdpub.repository.TableBookingRepository;
import com.nerdpub.repository.TableRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.repository.TableRepository;

@Service
public class TableBookingService {
    @Autowired
    private TableBookingRepository tableBookingRepository;

    @Autowired
    private TableRepository tableRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TableBoookingMapper bookingMapper;


    @Transactional
    public TableBookingDTO bookTable(TableBookingDTO bookingDto) {
        Member member = memberRepository.findById(bookingDto.getMemberId())
                .orElseThrow(() -> new EntityNotFoundException("Member not found"));

        Table table = tableRepository.findById(bookingDto.getTableId())
                .orElseThrow(() -> new EntityNotFoundException("Table not found"));

        if (!table.isAvailable()) {
            throw new TableNotAvailableException("Table is unavailable");
        }

        //How many places are available?
        int numOfPeople = tableBookingRepository.getAvailableSpots(bookingDto.getTableId(), bookingDto.getDate());
        if (numOfPeople >= table.getCapacity()) {
            throw new TableNotAvailableException("Table is full");
        }
        
        TableBooking booking = bookingMapper.toEntity(bookingDto);

        booking.setMember(member);
        booking.setTable(table);

        tableBookingRepository.save(booking);

        return bookingMapper.toDTO(booking);
    }

}
