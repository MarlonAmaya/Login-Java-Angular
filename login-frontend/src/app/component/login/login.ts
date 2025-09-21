import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ethers, HDNodeWallet } from 'ethers';
import { Share } from '../../service/share';
import { Router } from '@angular/router';
import { LoadVC } from '../load-vc/load-vc';
import { createVerifiableCredentialJwt, createVerifiablePresentationJwt, PresentationPayload } from 'did-jwt-vc';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    LoadVC,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  constructor(private share: Share, private router: Router){}

  loginForm!: FormGroup;

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        semilla: new FormControl('', Validators.required)
      })
  }

  async submit(){

    //Sacamos el Vc que se subió en loadVc
    const VcFile = this.share.getData();

    //Pide y recibe nonce del backend
    const {nonce} = await (await (fetch("http://localhost:8080/auth/nonce", {
      credentials: "include"
    }))).json();

    const wallet = HDNodeWallet.fromPhrase(this.loginForm.value.semilla);
    console.log(wallet.address);

    //Armar VP

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

  async createVP(vcFile: any, wallet: HDNodeWallet){
    
    const address = wallet.address;

    const vpPayload: PresentationPayload = {
      '@context': ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiablePresentation"],
      verifiableCredential: [vcFile],
      holder: `did:pkh:eip155:1:${address}`,
    };

    const vpJWT = await createVerifiablePresentationJwt(
      vpPayload,
      {
        did: `did:pkh:eip155:1:${address}`,
        signer: async (data: string | Uint8Array) => await wallet.signMessage(data),
      }
    )

    return vpJWT;
  }
}
