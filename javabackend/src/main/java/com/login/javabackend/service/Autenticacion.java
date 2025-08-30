/*package com.login.javabackend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.javabackend.dto.Peticion;
import com.login.javabackend.dto.Respuesta;
import com.login.javabackend.model.Usuario;
import com.login.javabackend.repository.UsuarioRepository;

@Service
public class Autenticacion {

    @Autowired
    private UsuarioRepository usuarioRepo;

    public Respuesta auth(Peticion peticion){
        Optional<Usuario> usuario = usuarioRepo.findByWalletAddress(peticion.getWalletAddress());

        if(usuario.isPresent() && usuario.get().getFraseSemilla().equals(peticion.getFraseSemilla())){
            String token = "ejemplo" + usuario.get().getWalletAddress();
            return new Respuesta(token);
        }
        
        throw new RuntimeException("Credenciales invalidas");
    }
}*/
