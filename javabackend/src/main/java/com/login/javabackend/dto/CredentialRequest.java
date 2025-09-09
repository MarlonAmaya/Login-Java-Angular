package com.login.javabackend.dto;

public class CredentialRequest {
    private String type;
    private String fieldName;
    private String fieldValue;
    private String holderId;

    public String getType() {
        return type;
    }
    public String getFieldName() {
        return fieldName;
    }
    public String getFieldValue() {
        return fieldValue;
    }
    public String getHolderId() {
        return holderId;
    }
}
