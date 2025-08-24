import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Peticion {usuario: string; contrasena: string};
interface Respuesta {respuesta: string};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient){}

  validate(nuevasCredenciales: Peticion, url: string) : Observable<Respuesta>{
    return this.http.post<Respuesta>(url,nuevasCredenciales);
  }
}
