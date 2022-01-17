import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup = this.fb.group({
    nombre: ['', [,Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required,Validators.minLength(6)]],
    rol:['paciente']
  });

  constructor(private authService: AuthService, 
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    this.authService.createUser(this.formRegister.value).subscribe((prod) => {
      this.router.navigateByUrl('/auth');
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado correctamente',
        text: 'Ya puede ingresar con su cuenta',
      })
    });
  }
}
