import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HDNodeWallet } from 'ethers';
import { Share } from '../../service/share';
import { Router } from '@angular/router';

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

  constructor(private share: Share, private router: Router){}

  loginForm!: FormGroup;

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        semilla: new FormControl('', Validators.required)
      })
  }

  async submit(){
    //Pide y recibe nonce del backend
    const {nonce} = await (await (fetch("http://localhost:8080/auth/nonce", {
      credentials: "include"
    }))).json();

    const wallet = HDNodeWallet.fromPhrase(this.loginForm.value.semilla);
    console.log(wallet.address);

    //Arma el mensaje firmado que va a mandar al backend
    //Sólo mandar el mensaje como json; que el backend se encargue de mapearlo al objeto correspondiente
    const messageObj = {
      address: wallet.address,
      chainId: 1,
      domain: window.location.host,
      nonce: nonce,
      statement: "Iniciar sesión con Ethereum",
      uri: window.location.origin,
      version: "1"      
    };

    //Envia el mensaje firmado al backend para verificar y recibe una respuesta o un DID
    const message = JSON.stringify(messageObj);//Convertir el objeto message en string antes de mandarlo al backend
    console.log(message);
    const signature = await wallet.signMessage(message);
    const verify = await fetch("http://localhost:8080/auth/verify", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify({message, signature})
    });

    const data = await verify.json();
    
    this.share.setData(data.userDid);
    console.log(data);

    this.router.navigate(["/vc"]);
  }
}
