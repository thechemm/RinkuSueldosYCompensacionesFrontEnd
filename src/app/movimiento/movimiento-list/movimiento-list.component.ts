import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ICatMes } from 'src/app/cat-mes/interfaces/cat-mes';
import { CatMesService } from 'src/app/cat-mes/services/cat-mes.service';
import { EmpleadoService } from 'src/app/empleado/services/empleado.service';
import { IMovimiento } from '../interfaces/movimiento';
import { MovimientoSavelComponent } from '../movimiento-savel/movimiento-savel.component';
import { MovimientoService } from '../services/movimiento.service';
import { forkJoin } from 'rxjs';
import { EmpleadoRolService } from 'src/app/empleado-rol/services/empleado-rol.service';
import { IEmpleadoRol } from 'src/app/empleado-rol/interfaces/empleado-rol';
import { IEmpleado } from 'src/app/empleado/interfaces/empleado';

@Component({
  selector: 'app-movimiento-list',
  templateUrl: './movimiento-list.component.html',
  styleUrls: ['./movimiento-list.component.css']
})
export class MovimientoListComponent implements OnInit ,AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IMovimiento>;

  dataSource= new MatTableDataSource<IMovimiento>();
  displayedColumns = ['id','empleado','entregas','mes','anio'];

  textFiltro: String = '';
  loading: boolean = true;
  meses: ICatMes[] = [];
  roles: IEmpleadoRol[] = [];
  empleadoslist: IEmpleado[] = [];
  sending:boolean = false;

  constructor(
    private _dialog: MatDialog,
    private _movimientosService:MovimientoService,
    private _empleadoService: EmpleadoService,
    private _rolesService: EmpleadoRolService,
    private _mesService: CatMesService,
    private _snakBar: MatSnackBar,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    forkJoin({
      meses: this._mesService.ReadAll(),
      roles:this._rolesService.ReadAll()
    }).subscribe(({
      meses,
      roles
    })=>{
      this.meses = meses;
      this.roles = roles;
       this.getRecords();
    });

  }

  

  getRecords(){
    this._movimientosService.ReadAll().subscribe({
      next:(response)=>{
        console.log(response)
        this.dataSource.data = response;
        this.getEmpleados();
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
    const dialog = this._dialog.open(MovimientoSavelComponent,{
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
   
  getEmpleados(){
    this.dataSource.data.forEach((val,index)=>{
      this._empleadoService.ReadOne(val.id).subscribe({
      next:(value)=> {
        this.empleadoslist.push(value);
      },
      error:(err)=> {
        console.log(err)
      },
    });
    });
  }

  getEmpleadoName(idEmpleado:number){
    return this.empleadoslist.find(x=>x.id==idEmpleado)?.nombre;
  }
  
  getMesName(id:number){
    if(id>0){
    return this.meses.find(x=>x.id==id)!.nombre;
  }else{
    return '';
  }
  }

}
