package com.nerdpub.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TableBookingDTO {
    private int id;

    private int pubTableId;

    private int memberId;

    private LocalDate date;
}
