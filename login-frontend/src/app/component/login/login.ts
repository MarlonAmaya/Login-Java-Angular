import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {ethers} from 'ethers';
import {SiweMessage} from "siwe";
import { RegisterService } from '../../service/register-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
/*
  loginForm! : FormGroup;

  constructor(private registro: RegisterService){}

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        walletAddress: new FormControl('', Validators.required),
        fraseSemilla: new FormControl('', Validators.required)
      })
  }

  submit(){
    if(this.loginForm.valid){
      this.registro.validate(this.loginForm.value, "http://localhost:8080/api/login").subscribe({
        next:(respuesta) => {
          alert("Bienvenido");
          console.log("token ->", respuesta)
        },
        error: (error) => {
          alert("Credenciales incorrectas");
          console.log("error: ",error);
        }
      })
    }
  }*/

  loginForm!: FormGroup;

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        semilla: new FormControl('', Validators.required)
      })
  }

  async submit(){
    //Pide y recibe nonce del backend
    const {nonce} = await (await (fetch("https://localhost:8080/auth/nonce"))).json();
    console.log("Llegó al primer fetch");

    let wallet = ethers.Wallet.fromPhrase(this.loginForm.value);

    //Arma el mensaje firmado que va a mandar al backend
    const domain = window.location.host;
    const address = wallet.address;
    const chainID = 1;

    const message = new SiweMessage({
      domain,
      address,
      statement: "Iniciar sesión con Ethereum",
      uri: window.location.origin,
      version: "1",
      chainId: chainID,
      nonce,
      issuedAt: new Date().toISOString(),
    });

    //Envia el mensaje firmado al backend para verificar y recibe una respuesta o un DID
    const signature = await wallet.signMessage(message.prepareMessage());
    const verify = await fetch("https://localhost:8080/auth/verify", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({message, signature})
    });
    console.log("Llegó al segundo fetch");

    const data = await verify.json();
    
    console.log(data);
  }
}
