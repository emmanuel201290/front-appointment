import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentDeleteComponent } from './pages/appointment-delete/appointment-delete.component';
import { AppointmentRegisterComponent } from './pages/appointment-register/appointment-register.component';
import { AppointmentTodayComponent } from './pages/appointment-today/appointment-today.component';
import { ScheduleNewComponent } from './pages/schedule-new/schedule-new.component';
import { ScheduleViewComponent } from './pages/schedule-view/schedule-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ListadoComponent,
    HomeComponent,
    AppointmentDeleteComponent,
    AppointmentRegisterComponent,
    AppointmentTodayComponent,
    ScheduleNewComponent,
    ScheduleViewComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDatepickerModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule
   ]
})
export class ProtectedModule { }
