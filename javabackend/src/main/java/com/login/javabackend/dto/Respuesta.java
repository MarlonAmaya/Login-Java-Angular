package com.login.javabackend.dto;

public class Respuesta {
    
    private final String token;

    public Respuesta(String token){
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
