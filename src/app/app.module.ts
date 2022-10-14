import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTabsModule} from '@angular/material/tabs';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule} from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { EmpleadoSavelComponent } from './empleado/empleado-savel/empleado-savel.component';
import { EmpleadoRolListComponent } from './empleado-rol/empleado-rol-list/empleado-rol-list.component';
import { EmpleadoRolSavelComponent } from './empleado-rol/empleado-rol-savel/empleado-rol-savel.component';
import { MovimientoListComponent } from './movimiento/movimiento-list/movimiento-list.component';
import { MovimientoSavelComponent } from './movimiento/movimiento-savel/movimiento-savel.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { LoadingComponent } from './loading/loading.component';
import { SueldoMensualListComponent } from './sueldo-mensual/sueldo-mensual-list/sueldo-mensual-list.component';


@NgModule({
  declarations: [
    AppComponent,
    EmpleadoListComponent,
    EmpleadoSavelComponent,
    EmpleadoRolListComponent,
    EmpleadoRolSavelComponent,
    MovimientoListComponent,
    MovimientoSavelComponent,
    NavigatorComponent,
    LoadingComponent,
    SueldoMensualListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTableModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
