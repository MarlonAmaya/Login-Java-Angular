package com.login.javabackend.service;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import org.web3j.crypto.Keys;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

public class EthereumVerifier {
    public static String recoverAddress(String message, String signatureHex) throws Exception {
        byte[] messageBytes = message.getBytes(StandardCharsets.UTF_8);
        byte[] prefix = ("\u0019Ethereum Signed Message:\n" + messageBytes.length).getBytes(StandardCharsets.UTF_8);
        byte[] prefixedMessage = new byte[prefix.length + messageBytes.length];

        System.arraycopy(prefix, 0, prefixedMessage, 0, prefix.length);
        System.arraycopy(messageBytes, 0, prefixedMessage, prefix.length, messageBytes.length);

        byte[] hashed = org.web3j.crypto.Hash.sha3(prefixedMessage);

        byte[] signatureBytes = Numeric.hexStringToByteArray(signatureHex);
        if (signatureBytes.length != 65) throw new IllegalArgumentException("Invalid signature length");

        byte v = signatureBytes[64];
        if (v < 27) v += 27;

        Sign.SignatureData sigData = new Sign.SignatureData(
                v,
                Arrays.copyOfRange(signatureBytes, 0, 32),
                Arrays.copyOfRange(signatureBytes, 32, 64)
        );

        BigInteger publicKey = Sign.signedMessageHashToKey(hashed, sigData);
        return "0x" + Keys.getAddress(publicKey);
    }
}
