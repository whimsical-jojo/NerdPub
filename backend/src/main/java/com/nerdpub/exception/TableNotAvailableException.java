package com.nerdpub.exception;

public class TableNotAvailableException extends RuntimeException{
    public TableNotAvailableException(String message) {
        super(message);
    }
}
