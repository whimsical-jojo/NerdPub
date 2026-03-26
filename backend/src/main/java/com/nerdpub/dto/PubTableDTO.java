package com.nerdpub.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PubTableDTO {
    private int id;
    
    private String name;
    @Min(1)
    @NotNull
    private Integer capacity;
    private boolean available;

    //Response
    private PubDTO pub;

    //Request
    @Min(1)
    @NotNull
    private Integer pubId;
}
