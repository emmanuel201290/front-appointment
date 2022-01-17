import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../auth/interface/UserInterface';

@Injectable({
  providedIn: 'root'
})
export class ValidarGuard implements CanActivate, CanLoad , CanActivateChild {
  usr: User[] = [];
  routeValid=false;

  constructor(private router: Router){}

  canActivate(): Observable<boolean>  | boolean  {
    return true;
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('can load');
    //Verificar exista usuario activo. //desarrollo pendiente con el token
    if(localStorage.getItem('id')){
      return true;
    }else{
      this.router.navigateByUrl('/auth');
      return false;
    }  
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.usr=JSON.parse(localStorage.getItem("id")!);
    console.log(this.usr);
    const rol = this.usr[0].rol;
 
    if(state.url==="/dashboard/schedule/new" && rol==="paciente" ){
      Swal.fire({
        icon: 'error',
        title: 'Error de',
        text: 'Usuario visible solo para paciente',
      });
      return false; 
    }

    if(state.url==="/dashboard/appointment/today" && rol===""){
      Swal.fire({
        icon: 'error',
        title: 'Error de',
        text: 'Usuario visible solo para paciente',
      });
      return false;
    }

    if(state.url==="/dashboard/appointment" && rol==="medico"){
      Swal.fire({
        icon: 'error',
        title: 'Error de',
        text: 'Usuario visible solo para paciente',
      });
      return false;
    }

    if(state.url==="/dashboard/appointment/delete" && rol==="medico"){
      Swal.fire({
        icon: 'error',
        title: 'Error de',
        text: 'Usuario visible solo para paciente',
      });
      return false;
    }

    return true;
  }
}
