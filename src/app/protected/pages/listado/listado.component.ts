import { Component, OnInit } from '@angular/core';
import { Citas } from '../../interfaces/protected.interfaces';
import { ProtectedService } from '../../services/protected.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
    `
      .container01 {
      }
    `,
  ],
})
export class ListadoComponent implements OnInit {
  appointment: Citas[] = [];
  constructor(private protectedServices: ProtectedService) {}

  ngOnInit(): void {
    this.protectedServices.getAppointment().subscribe((data) => {
      this.appointment = data;
     
    });
  }

  logout(){
    localStorage.removeItem("id");
  }
}