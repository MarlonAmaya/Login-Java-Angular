import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterService } from '../../service/register-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit{
  registerForm! : FormGroup;

  constructor
  (
    private registro: RegisterService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        walletAddress: new FormControl('', Validators.required),
        fraseSemilla: new FormControl('', Validators.required)
      })
  }

  submit(){
    if(this.registerForm.valid){
      this.registro.validate(this.registerForm.value, "http://localhost:8080/api/register").subscribe({
        next: (respuesta) => {
          console.log(respuesta);
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.log("error: ", error);
          alert("Nombre de usuario en uso");
        }
      })
    }
  }
}
