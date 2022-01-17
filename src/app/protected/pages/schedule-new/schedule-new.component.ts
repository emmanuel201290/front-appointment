import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface/UserInterface';
import Swal from 'sweetalert2';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-schedule-new',
  templateUrl: './schedule-new.component.html',
  styles: [
  ]
})
export class ScheduleNewComponent implements OnInit {
  userData: User[] = [];

  formDisponibilidad: FormGroup = this.fb.group({
    idUsuario: ['',[Validators.required]],
    horaInicio: ['',[Validators.required]],
    horaFin: ['',[Validators.required]],
    dia: ['',[]],
    });

  constructor(private fb: FormBuilder, 
             private protectedService: ProtectedService,
             private router: Router) { }

  ngOnInit(): void {
    this.protectedService.getUserByRol("medico").subscribe((userRoles) => {
      this.userData=userRoles;
    });
  }

  registerDisp(){
    if(this.formDisponibilidad.value.horaInicio.substr(0,2) > this.formDisponibilidad.value.horaFin.substr(0,2)){
       Swal.fire('Error', "Hora de inicio debe ser menor a la hora fin", 'error');
     }else
     {
       this.protectedService.createDispon(this.formDisponibilidad.value).subscribe((dis)=>{
         const retmsg=this.protectedService.obteneError;
         if(retmsg!=="ok")
           {
             Swal.fire('Ok', retmsg, 'success');
             this.router.navigateByUrl('/dashboard');
           }
           else
            {
              Swal.fire('Success', 'Disponibilidad registrada correctamente', 'success')}
            ;
       });    
      }
   }
}