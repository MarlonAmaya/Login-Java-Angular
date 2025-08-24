package com.login.javabackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.javabackend.dto.Peticion;
import com.login.javabackend.dto.Respuesta;
import com.login.javabackend.model.Usuario;
import com.login.javabackend.repository.UsuarioRepository;

@Service
public class Registro {

    @Autowired
    private UsuarioRepository usuarioRepo;

    public Respuesta registrarUsuario(Peticion peticion){
        Usuario usuario = new Usuario(peticion.getWalletAddress(), peticion.getFraseSemilla());

        if(!usuarioRepo.findByWalletAddress(peticion.getWalletAddress()).isPresent()){
            usuarioRepo.save(usuario);
            return new Respuesta("Usuario Creado");
        }

        throw new RuntimeException("El usuario ya existe");
    }
}
