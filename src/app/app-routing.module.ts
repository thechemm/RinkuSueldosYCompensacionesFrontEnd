import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoRolListComponent } from './empleado-rol/empleado-rol-list/empleado-rol-list.component';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { MovimientoListComponent } from './movimiento/movimiento-list/movimiento-list.component';
import { SueldoMensualListComponent } from './sueldo-mensual/sueldo-mensual-list/sueldo-mensual-list.component';

const routes: Routes = [
  {path:'empleados', component:EmpleadoListComponent},
  {path:'movimientos', component:MovimientoListComponent},
  {path:'roles', component:EmpleadoRolListComponent},
  {path:'sueldos', component:SueldoMensualListComponent},
  {path:'**', redirectTo:'empleados'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
