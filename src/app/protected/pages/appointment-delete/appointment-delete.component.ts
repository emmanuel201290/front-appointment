import { Component, OnInit } from '@angular/core';
import { Citas } from '../../interfaces/protected.interfaces';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-appointment-delete',
  templateUrl: './appointment-delete.component.html',
  styles: [
  ]
})
export class AppointmentDeleteComponent implements OnInit {
  appointment: Citas[] = [];
  constructor(private protectedServices: ProtectedService) { }

  ngOnInit(): void {
    this.protectedServices.getAppointment().subscribe((data) => {
      this.appointment = data;
    });
  }

  RowSelected(appoint: Citas){
   this.protectedServices.deleteAppointment(appoint.id).subscribe((del)=>{
    this.protectedServices.getAppointment().subscribe((data) => {
      this.appointment = data;
     }); 
    })
  }
}