package com.login.javabackend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.javabackend.dto.CredentialRequest;
import com.login.javabackend.service.IssuerService;

@RestController
@RequestMapping("/vc")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class VcController {
    private final IssuerService issuer;

    public VcController(IssuerService issuer){
        this.issuer = issuer;
    }

    @PostMapping("/issue")
    public Map<String, Object> issue(@RequestBody CredentialRequest req) throws Exception {
        return issuer.issueVC(req);
    }
}
