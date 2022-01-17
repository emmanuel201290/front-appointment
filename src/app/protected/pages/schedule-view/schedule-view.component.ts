import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/auth/interface/UserInterface';
import { Disponibilidad } from '../../interfaces/protected.interfaces';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styles: [
  ]
})
export class ScheduleViewComponent implements OnInit {

  userData: User[] = [];
  schedule: Disponibilidad[] = [];
  formScheduleView: FormGroup = this.fb.group({
    idMedico: ['',[Validators.required]],
  })

  constructor( private fb: FormBuilder,
               private protectedService: ProtectedService) { }

  ngOnInit(): void {
    this.protectedService.getUserByRol("medico").subscribe((userRoles) => {
      this.userData=userRoles;
    });
  }

   getDispinibilidadView(){
    const {idMedico}=this.formScheduleView.value;
    this.protectedService.getDisponibilidadView(idMedico).subscribe((disp)=>{
      console.log(disp);
      this.schedule=disp;
    });
  }
}