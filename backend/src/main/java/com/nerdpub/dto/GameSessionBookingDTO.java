package com.nerdpub.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSessionBookingDTO {
    private int id;

    private GameSessionDTO session;
    private MemberDTO member;

    private int sessionId;
    private int memberId;
}
