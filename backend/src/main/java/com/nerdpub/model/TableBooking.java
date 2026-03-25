package com.nerdpub.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

/*
    POST /np/api/bookings

    deve ricevere un TableBookingDTO
    deve produrre 200 se la prenotazione è stata accettata
    variazioni di 400 se non basta lo spazio
    se il tavolo non esiste e così via e così via

    nel caso di 200 voglio il dto di booking con id
    nel caso di 400 un errore sensato che verrà mostrato da angular
    per ora non mi serve il jwt
*/

@Data
@Entity
public class TableBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "table_id")
    private Table table;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private LocalDate date;
}
