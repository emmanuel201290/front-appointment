import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interface/UserInterface';
import { AuthService } from '../../../auth/services/auth.service';
import { Citas } from '../../interfaces/protected.interfaces';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-appointment-today',
  templateUrl: './appointment-today.component.html',
  styles: [],
})
export class AppointmentTodayComponent implements OnInit {

  userData: User[] = [];
  appointmentData: Citas[]=[];

  formAppointmentToday: FormGroup = this.fb.group({
     idMedico: ['',[Validators.required]],
     idUsuario: [this.authservice.user,[]],
     nombrePaciente: [''],
     fechaVisita: [],
     horaInicio: [''],
     horaFin: [''],
     dia: ['',[]],
     fechaRegistro: [],//se llena en bd
     mes: ['',[]],
     anio: ['',[]],
  })

  constructor(private authservice: AuthService,
              private fb: FormBuilder,
              private protectedService: ProtectedService) {}

  ngOnInit(): void {
    this.protectedService.getUserByRol("medico").subscribe((userRoles) => {
      this.userData=userRoles;
    });
  }

  getAppointment(){
    const { idMedico } = this.formAppointmentToday.value;
   
    this.protectedService.getAppointmentToday(idMedico).subscribe((appoint)=>{
      this.appointmentData=appoint;
    })
  }
}
