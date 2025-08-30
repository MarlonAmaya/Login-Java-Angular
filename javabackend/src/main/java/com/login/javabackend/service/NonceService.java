package com.login.javabackend.service;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class NonceService {
    private final SecureRandom random = new SecureRandom();
    private final ConcurrentHashMap<String, Boolean> nonceStore = new ConcurrentHashMap<>();
    
    public String generateNonce() {
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);

        String nonce = Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
        nonceStore.put(nonce, false);

        return nonce;
    }

    public Boolean consumeNonce(String nonce) {
        if(nonceStore.containsKey(nonce) && !nonceStore.get(nonce)) {
            nonceStore.put(nonce, true);
            return true;
        }

        return false;
    }
}
