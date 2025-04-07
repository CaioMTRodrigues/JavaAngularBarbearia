package com.barbearia.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)  // Retorna HTTP 409 Conflict quando lançada
public class ConflictException extends RuntimeException {
    
    public ConflictException(String message) {
        super(message);
    }
    
    public ConflictException(String resource, String conflictDetail) {
        super(String.format("Conflito ao processar %s: %s", resource, conflictDetail));
    }
}