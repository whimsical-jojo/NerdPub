package com.nerdpub.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {
    private int id;
    
    private String firstName;
    private String lastName;

    private LocalDate dob;
}
