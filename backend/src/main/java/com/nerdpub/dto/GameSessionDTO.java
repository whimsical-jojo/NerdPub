package com.nerdpub.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSessionDTO {
    int id;

    private GameDTO game;
    private LocalDate date;
    private PubTableDTO table;

    private int gameId;
    private int tableId;

}
