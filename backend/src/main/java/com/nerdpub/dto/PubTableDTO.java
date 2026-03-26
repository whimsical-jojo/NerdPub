package com.nerdpub.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PubTableDTO {
    private int id;
    
    private String name;
    private int capacity;
    private boolean available;

    private int pubId;
}
