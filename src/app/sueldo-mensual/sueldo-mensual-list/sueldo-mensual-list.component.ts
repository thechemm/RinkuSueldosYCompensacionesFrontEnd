import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmpleadoService } from 'src/app/empleado/services/empleado.service';
import { ISueldoFiltro } from '../interfaces/sueldo-filtro';
import { ISueldoMensual } from '../interfaces/sueldo-mensual';
import { SueldoMensualService } from '../services/sueldo-mensual.service';

@Component({
  selector: 'app-sueldo-mensual-list',
  templateUrl: './sueldo-mensual-list.component.html',
  styleUrls: ['./sueldo-mensual-list.component.css']
})
export class SueldoMensualListComponent implements OnInit ,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ISueldoMensual>;

  dataSource= new MatTableDataSource<ISueldoMensual>();
  displayedColumns = ['nombreEmpleado','totalEntregas','sueldoBase','bonoPorHora','bonoPorEntrega','totalRetencion','totalSueldo','montoVales'];

  textFiltro: String = '';
  loading: boolean = true;
  sending:boolean = false;
  filtroSueldos:ISueldoFiltro = {
    anio:new Date().getFullYear(),
    idMes: new Date().getMonth()
  }

  constructor(
    private _sueldoService: SueldoMensualService,
    private _snakBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords(){
    this._sueldoService.GetSueldos(this.filtroSueldos).subscribe({
      next:(response)=>{
        this.dataSource.data = response;
      },
      error:(err)=> {
        console.log(err);
        this._snakBar.open('Ocurrio un error al consultar los empleados','OK',{duration:5000})
      },
      complete:()=> {
        this.loading = false;
      }
    }
      
      
    );
  }

  

  aplicarFiltro(){
    this.dataSource.filter = this.textFiltro.trim().toString();
  }

 

}
