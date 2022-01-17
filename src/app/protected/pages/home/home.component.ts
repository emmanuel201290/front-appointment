import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProtectedService } from '../../services/protected.service';

interface MenuItem {
  texto: string;
  ruta: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
      .container {
        margin-left: 30%;
    }
    `,
  ],
})
export class HomeComponent implements OnInit {
  
  formInit: FormGroup = this.fb.group({
  });
  
  constructor(private protectedService: ProtectedService,
              private authService: AuthService, 
              private fb: FormBuilder,
              private router: Router) {}
  
  ngOnInit(): void {
    this.protectedService.getDisponibilidad().subscribe((disp) => {
      if (disp == 0) {
        //Permite extraer informacion cuando las tablas usuario y disponibilidad esten vacia
        this.protectedService.init().subscribe((reg) => {
        });
      }
    });
  }

  templateMenu: MenuItem[] = [
    {
      texto: 'Ver todas las citas',
      ruta: './appointment',
    },
    {
      texto: 'Ver citas de hoy',
      ruta: './appointment/today',
    },
    {
      texto: 'Agendar una cita',
      ruta: './appointment/register',
    },
    {
      texto: 'Eliminar una cita',
      ruta: './appointment/delete',
    },
    {
      texto: 'Ver horario',
      ruta: './schedule',
    },
    {
      texto: 'Modificar un horario',
      ruta: './schedule/new',
    },
  ];

  logout(){
    localStorage.removeItem("id");
    this.router.navigateByUrl('/auth');
      
  }
}
