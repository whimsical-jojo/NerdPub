package com.nerdpub.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSessionBookingDTO {
    private int id;

    private int sessionId;

    private int memberId;
}
