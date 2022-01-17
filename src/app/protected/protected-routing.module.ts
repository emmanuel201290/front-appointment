import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarGuard } from '../guard/validar.guard';
import { AppointmentDeleteComponent } from './pages/appointment-delete/appointment-delete.component';
import { AppointmentRegisterComponent } from './pages/appointment-register/appointment-register.component';
import { AppointmentTodayComponent } from './pages/appointment-today/appointment-today.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ScheduleNewComponent } from './pages/schedule-new/schedule-new.component';
import { ScheduleViewComponent } from './pages/schedule-view/schedule-view.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [ValidarGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'appointment', component: ListadoComponent },
      { path: 'appointment/today', component: AppointmentTodayComponent },
      { path: 'appointment/register', component: AppointmentRegisterComponent },
      { path: 'appointment/delete', component: AppointmentDeleteComponent },
      { path: 'schedule', component: ScheduleViewComponent },
      { path: 'schedule/new', component: ScheduleNewComponent },
      { path: '**', redirectTo: 'home' },
    ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
