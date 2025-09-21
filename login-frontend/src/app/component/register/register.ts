import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ethers } from 'ethers';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
  registerForm!: FormGroup;

  constructor(private router: Router){}

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        semilla: new FormControl('', Validators.required)
      });
  }

  generateWallet(){
    this.registerForm.setValue({semilla: ethers.Wallet.createRandom().mnemonic?.phrase || ''});
  }

  async register(){
    //crear wallet en navegador
    const wallet = ethers.Wallet.fromPhrase(this.registerForm.value.semilla);
    //enviar DID
    const did = "did:pkh:eip155:1" + wallet.address;
    const credentialReq = {
      type: "Login Credential",
      fieldName: "Mensaje",
      fieldValue: "Este usuario ha sido autorizado",
      holderId: did
    }

    const vc = await (await fetch('http://localhost:8080/vc/issue',{
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(credentialReq)
    })).json();

    const res = await fetch('http://localhost:8080/register/new',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: did
    });

    if(!res.ok){
      throw new Error(`Ha habido un error al ingresar el usuario: ${res.status}`);
    }

    this.downloadVC(vc, "access_credential.vc.json");
  }

  downloadVC(vc: any, fileName: string){
    const blob = new Blob([JSON.stringify(vc,null, 2)], {type: "application/json"});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  }
}
