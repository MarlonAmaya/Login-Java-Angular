package com.login.javabackend.dto;

public class SiweRequest {
    private String message;
    private String signature;

    public String getMessage() {
        return message;
    }
    public String getSignature() {
        return signature;
    }
}
