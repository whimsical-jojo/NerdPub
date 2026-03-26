package com.nerdpub.dto;

import java.time.LocalDate;

import com.nerdpub.model.Game;
import com.nerdpub.model.PubTable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSessionDTO {
    int id;

    private int gameId;
    private LocalDate date;
    private int tableId;
}
