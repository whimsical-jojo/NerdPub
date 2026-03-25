package com.nerdpub.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PubDTO {
    public int id;

    private String name;
    private String address;
    private String city;

    private List<Integer> tableIds;
    private List<Integer> gameIds;
}
