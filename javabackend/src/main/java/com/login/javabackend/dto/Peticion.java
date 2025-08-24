package com.login.javabackend.dto;

public class Peticion {
    private String walletAddress;
    private String fraseSemilla;
    
    public String getWalletAddress() {
        return walletAddress;
    }
    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }
    public String getFraseSemilla() {
        return fraseSemilla;
    }
    public void setFraseSemilla(String fraseSemilla) {
        this.fraseSemilla = fraseSemilla;
    }
}
