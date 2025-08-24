import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  }
}
