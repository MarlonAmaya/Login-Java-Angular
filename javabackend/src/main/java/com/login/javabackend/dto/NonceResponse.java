package com.login.javabackend.dto;

public class NonceResponse {
    private String nonce;
    
    public NonceResponse(String nonce) {
        this.nonce = nonce;
    }

    public String getNonce() {
        return nonce;
    }
}
