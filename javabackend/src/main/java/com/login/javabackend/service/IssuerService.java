package com.login.javabackend.service;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.Hash;
import org.web3j.crypto.Sign;
import org.web3j.utils.Numeric;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.login.javabackend.dto.CredentialRequest;

@Service
public class IssuerService {
    private final ObjectMapper mapper = new ObjectMapper();
    private final Credentials issuerWallet;

    public IssuerService() {
        this.issuerWallet = Credentials.create("0x74cf68e355ddb0592d186b8de13c3225d8281f6390136b75e70d145e6a6d5c03");
    }

    public Map<String, Object> issueVC(CredentialRequest req) throws Exception {
        String issuerDid = "did:pkh:eip155:1:" + issuerWallet.getAddress();

        //Primera parte del VC
        Map<String, Object> vc = new LinkedHashMap<>();
        vc.put("@context", List.of("https://www.w3.org/2018/credentials/v1"));
        vc.put("id", "urn:uuid:" + UUID.randomUUID());
        vc.put("type", List.of("VerifiableCredential", req.getType()));
        vc.put("issuer", issuerDid);
        vc.put("issuanceDate", Instant.now().toString());

        //Parte de Credential Subject, se añade a lo anterior
        Map<String, Object> subject = new LinkedHashMap<>();
        subject.put("id", req.getHolderId());
        subject.put(req.getFieldName(), req.getFieldValue());
        vc.put("credentialSubject", subject);

        //Firmar La primera parte del VC
        String unsignedJson = mapper.writeValueAsString(vc);
        byte[] hash = Hash.sha3(unsignedJson.getBytes(StandardCharsets.UTF_8));
        Sign.SignatureData sig = Sign.signMessage(hash, issuerWallet.getEcKeyPair());

        String jws = encodeSignature(sig);

        Map<String, Object> proof = new LinkedHashMap<>();
        proof.put("type", "EcdsaSecp256k1Signature2019");
        proof.put("created", Instant.now().toString());
        proof.put("proofPurpose", "assertionMethod");
        proof.put("verificationMethod", issuerDid + "#controller");
        proof.put("jws", jws);

        vc.put("proof", proof);
        return vc;
    }

    private String encodeSignature(Sign.SignatureData sig) {
        byte[] r = sig.getR();
        byte[] s = sig.getS();
        byte[] vArr = sig.getV();
        if (vArr == null || vArr.length == 0) {
            throw new IllegalStateException("v array empty");
        }
        byte v = vArr[0];
        if (v < 27) v += 27;

        byte[] full = new byte[r.length + s.length + 1];
        System.arraycopy(r, 0, full, 0, r.length);
        System.arraycopy(s, 0, full, r.length, s.length);
        full[full.length - 1] = v;

        return Numeric.toHexString(full);
    }
}
