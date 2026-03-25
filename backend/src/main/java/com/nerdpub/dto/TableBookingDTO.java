package com.nerdpub.dto;

import java.time.LocalDate;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TableBookingDTO {
    private int id;

    private int tableId;

    private int memberId;

    private LocalDate date;
}
