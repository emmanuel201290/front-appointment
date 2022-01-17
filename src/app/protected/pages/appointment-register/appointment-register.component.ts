import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interface/UserInterface';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-appointment-register',
  templateUrl: './appointment-register.component.html',
  styles: [
  ]
})
export class AppointmentRegisterComponent implements OnInit {
  
  userData: User[] = [];
  fechaVisita: String="";
  msj: string=""

  formAppointment: FormGroup = this.fb.group({
     idMedico: ['',[Validators.required]],
     idUsuario: [this.authService.user,[]],
     nombrePaciente: [this.authService.userName],
     fechaVisita: [],
     horaInicio: ['',[Validators.required]],
     horaFin: ['',[Validators.required]],
     dia: ['',[]],
     fechaRegistro: [],//se llena en bd
     mes: ['',[]],
     anio: ['',[]],
  });
  constructor(private fb: FormBuilder, 
              private protectedService: ProtectedService, 
              private authService: AuthService) { }

  ngOnInit(): void {
    this.protectedService.getUserByRol("medico").subscribe((userRoles) => {
      this.userData=userRoles;
    });
  }

  registerAppointment(){
   if(this.formAppointment.value.horaInicio.substr(0,2) > this.formAppointment.value.horaFin.substr(0,2)){
      Swal.fire('Error', "Hora de inicio debe ser menor a la hora fin", 'error');
    }else
    {
      this.protectedService.validAppointment(this.formAppointment.value).subscribe((dis)=>{
        const retmsg=this.protectedService.obteneError;
        if(retmsg!=="ok"){
          Swal.fire('Error', retmsg, 'error');
        }
          else{
            Swal.fire('Success', retmsg, 'success');
          }
      });      
     }
  }
}


