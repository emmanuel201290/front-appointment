import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Citas, Disponibilidad } from '../interfaces/protected.interfaces';
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../../auth/interface/Schedule.interface';
import { AuthResponse, User } from '../../auth/interface/UserInterface';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProtectedService {

  private baseUrl: string = environment.baseUrl;

  private error2: string = "";
  get obteneError(){
      return this.error2;
   }

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAppointment(): Observable<Citas[]> {
    return this.http.get<Citas[]>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.entities.citas/`
    );
  }

  getAppointmentToday(idMedico: String):Observable<Citas[]>{
    return this.http.get<Citas[]>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.entities.citas/appointment/${idMedico}`
    );
  }

  validAppointment(citas: FormGroup) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/ClinicaBack/webresources/validate`,
      citas
    )
    .pipe(
      catchError( err => {
        const error = err.error?.error_description || err.error?.message || err.error?.text || err.statusText;
        this.error2=error;
        return of(err.error.msg)
       })
     );
  }

  createAppointment(citas: FormGroup){
    return this.http.post<Citas>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.entities.citas`,
      citas);
  }

   deleteAppointment(id: String):Observable<User[]>{
    return this.http.delete<any>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.entities.citas/${id}`
    )
  }

  //verifica si existen registros, de no existir disponibilidad se llena desde endpoint externo
  getDisponibilidad(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.disponibilidad/count`
    );
  }

  getDisponibilidadView(id: String): Observable<Disponibilidad[]>{
    return this.http.get<Disponibilidad[]>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.disponibilidad/disponibilidadView/${id}`
    )
  }

  getUserByRol(rol: string):Observable<User[]>{
    return this.http.get<User[]>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.usuario/finAllByRol/${rol}`
    )
  }

  createDispon(disp: FormGroup) {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/ClinicaBack/webresources/clinica.disponibilidad`,
      disp
    )
    .pipe(
      catchError( err => {
        const error = err.error?.error_description || err.error?.message || err.error?.text || err.statusText;
        this.error2=error;
        return of(err.error.msg)
      } )
     )
  }

  init(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(
      `${this.baseUrl}/ClinicaBack/webresources/init`
    );
  }
}