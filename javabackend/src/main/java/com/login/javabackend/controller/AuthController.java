package com.login.javabackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.javabackend.dto.NonceResponse;
import com.login.javabackend.dto.SiweRequest;
import com.login.javabackend.service.EthereumVerifier;
import com.login.javabackend.service.NonceService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AuthController {
    private final NonceService nonceService;

    public AuthController(NonceService nonceService) {
        this.nonceService = nonceService;
    }

    //Frontend pide nonce
    @GetMapping("/nonce")
    public NonceResponse getNonce(HttpSession session) {
        //Generar nonce y mandarlo al frontend
        String nonce = nonceService.generateNonce();
        session.setAttribute("nonce", nonce);
        return new NonceResponse(nonce);
    }

    //Frontend regresa mensaje nonce con firma
    @PostMapping("/verify")
    public Object verifyLogin(@RequestBody SiweRequest req, HttpSession session) throws Exception {
        String nonce = (String) session.getAttribute("nonce");
        if (nonce == null) return "No nonce en sesión";

        String message = req.getMessage();
        String signature = req.getSignature();

        //Verificando que venga el mismo nonce que está registrado en la sesión
        if (!nonceService.consumeNonce(nonce)) {
            return "Nonce inválido o ya fue utilizado";
        }

        //Recuperar address de la firma
        String recovered = EthereumVerifier.recoverAddress(message, signature);

        //Compara dicha address con la que viene en el mensaje
        if (!message.toLowerCase().contains(recovered.toLowerCase())) {
            return "Firma inválida";
        }

        //Construir DID
        String did = "did:pkh:eip155:1:" + recovered;

        session.setAttribute("user", did);

        return new Object() {
            public final boolean ok = true;
            public final String userDid = did;
        };
    }

    @GetMapping("/profile")
    public Object profile(HttpSession session) {
        Object user = session.getAttribute("user");
        if (user == null) return "No autenticado";
        return new Object() {
            public final String did = user.toString();
        };
    }
}
