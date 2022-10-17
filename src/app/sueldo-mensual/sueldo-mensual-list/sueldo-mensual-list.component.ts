import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ICatMes } from 'src/app/cat-mes/interfaces/cat-mes';
import { CatMesService } from 'src/app/cat-mes/services/cat-mes.service';
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
  form!: FormGroup;
  textFiltro: String = '';
  loading: boolean = false;
  sending:boolean = false;
  meses: ICatMes[] = [];
  filtroSueldos:ISueldoFiltro = {
    anio:new Date().getFullYear(),
    idMes: 1
  }

  constructor(
    private _sueldoService: SueldoMensualService,
    private _snakBar: MatSnackBar,
    private _mesService: CatMesService,
    private _formBuil: FormBuilder,
  ) {
    this.form=this.FormBuilder();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.GetMeses();
  }

  getRecords(){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
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

  GetMeses(){
    this._mesService.ReadAll().subscribe({
      next:(v)=>this.meses = v,
      error:(e)=>this._snakBar.open(e.error.text,'OK',{duration:5000})
    });
  }


  aplicarFiltro(){
    this.dataSource.filter = this.textFiltro.trim().toString();
  }

  FormBuilder(){
    return this._formBuil.group({
      idMes: [null,Validators.required],
      anio: [new Date().getFullYear(),Validators.required]
    });
  }

}
