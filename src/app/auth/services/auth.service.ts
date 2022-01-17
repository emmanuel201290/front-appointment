import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interface/UserInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private id: String = "";
  private nombre: String = "";
 
  get user() {
    return this.id;
  }
  get userName(){
    return this.nombre;
  }

  constructor(private http: HttpClient) {}

  //Crea un usuario en la tabla usuario
  createUser(user: User) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.usuario`,
      user
    );
  }

  //Metodo para autenticarse
  login(user: User) {
    return this.http
      .post<User>(
        `${this.baseUrl}/ClinicaBack/webresources/clinica.usuario/login`,
         user
      )
      .pipe(
        tap((resp) => {
          if (resp !== null) {
            //En el localStorage se almacena informacion del usuario en una varible llamada id
            //El proposito fue almacenar el token extraido de la bd
            localStorage.setItem('id',JSON.stringify(resp))
            this.id=JSON.parse(localStorage.getItem("id")!)[0].idUsuario;
            this.nombre=JSON.parse(localStorage.getItem("id")!)[0].nombre;
          }
        })
      );
  }
}