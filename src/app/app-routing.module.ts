import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarGuard } from './guard/validar.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
     path: 'dashboard',
     loadChildren:()=>import('./protected/protected.module').then(m=> m.ProtectedModule),
     canActivate: [ValidarGuard],
     canLoad:[ValidarGuard]
  },
  {
     path: '**',
     redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
