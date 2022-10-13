import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { EmpleadosSaveComponent } from '../empleados-save/empleados-save.component';
import { EmpleadosService } from '../services/empleados.service';
import { IEmpleadoRol } from '../../empleado-roles/interfaces/empleado-rol';
import { IEmpleado } from '../interfaces/empleado';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})
export class EmpleadosListComponent implements OnInit ,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IEmpleado>;

  dataSource= new MatTableDataSource<IEmpleado>();
  displayedColumns = ['id','nombre'];

  textFiltro: String = '';
  loading: boolean = false;
  perfils: IEmpleadoRol[] = [];
  sending:boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _empleadosService: EmpleadosService,
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
    this._empleadosService.ReadAll().subscribe(
      response=>{
        console.log(response)
        this.dataSource.data = response;
        this.loading = false;
        this.sending=false;
      }
    );
  }

  OpenSave(id: number){
    const dialog = this._dialog.open(EmpleadosSaveComponent,{
      data:{id:id},
      width:'50em',
      height:'40em'
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
    return this.perfils.filter(x=>x.id==id)[0].nombre;
  }else{
    return '';
  }
  }



}

