import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IEmpleadoRol } from 'src/app/empleado-rol/interfaces/empleado-rol';
import { EmpleadoRolService } from 'src/app/empleado-rol/services/empleado-rol.service';
import { EmpleadoSavelComponent } from '../empleado-savel/empleado-savel.component';
import { IEmpleado } from '../interfaces/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IEmpleado>;

  dataSource= new MatTableDataSource<IEmpleado>();
  displayedColumns = ['id','numero','nombre','rol'];

  textFiltro: String = '';
  loading: boolean = true;
  roles: IEmpleadoRol[] = [];
  sending:boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _empleadoService: EmpleadoService,
    private _rolesService: EmpleadoRolService,
    private _snakBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(){
    this._rolesService.ReadAll().subscribe({
      next:(value)=> {
        this.roles = value;
        this.getRecords();
      },
      error:(err)=> {
        console.log(err);
        this._snakBar.open('Ocurrio un error al consultar los roles','OK',{duration:5000})
      }
    });
  }

  getRecords(){
    this._empleadoService.ReadAll().subscribe({
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

  OpenSave(id: number){
    const dialog = this._dialog.open(EmpleadoSavelComponent,{
      data:{id:id},
      width:'50em',
      height:'23em'
    });
    dialog.afterClosed().subscribe(()=>{
      this.getRecords();
    });
  }

  aplicarFiltro(){
    this.dataSource.filter = this.textFiltro.trim().toString();
  }

  getPerfilName(id:number){
    if(id>0){
    return this.roles.filter(x=>x.id==id)[0].nombre;
  }else{
    return '';
  }
  }
}
