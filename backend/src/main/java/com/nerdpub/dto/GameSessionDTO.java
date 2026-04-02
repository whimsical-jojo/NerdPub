package com.nerdpub.dto;

import java.time.LocalDate;

import lombok.Data;


@Data
public class GameSessionDTO {
    int id;

    private GameDTO game;
    private LocalDate date;
    private PubTableDTO table;

    private int gameId;
    private int tableId;

}
