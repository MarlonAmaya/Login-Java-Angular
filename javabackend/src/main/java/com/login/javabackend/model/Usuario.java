package com.login.javabackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Wallets")
public class Usuario {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    @Column(unique=true)
    private String walletAddress;
    private String fraseSemilla;

    public Usuario(){}

    public Usuario(String walletAddress, String fraseSemilla){
        this.walletAddress = walletAddress;
        this.fraseSemilla = fraseSemilla;
    }

    public Integer getId() {
        return id;
    }
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
