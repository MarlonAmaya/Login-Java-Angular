/*package com.login.javabackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.javabackend.dto.Peticion;
import com.login.javabackend.dto.Respuesta;
import com.login.javabackend.service.Autenticacion;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api")
public class AuntenticacionController {

    @Autowired
    private Autenticacion autenticacionService;

    @PostMapping("/login")
    public ResponseEntity<Respuesta> login(@RequestBody Peticion peticion){
        Respuesta tokenRespuesta = autenticacionService.auth(peticion);

        return ResponseEntity.ok(tokenRespuesta);
    }
}*/
