import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICatMes } from 'src/app/cat-mes/interfaces/cat-mes';
import { CatMesService } from 'src/app/cat-mes/services/cat-mes.service';
import { IEmpleadoRol } from 'src/app/empleado-rol/interfaces/empleado-rol';
import { EmpleadoRolService } from 'src/app/empleado-rol/services/empleado-rol.service';
import { IEmpleado } from 'src/app/empleado/interfaces/empleado';
import { EmpleadoService } from 'src/app/empleado/services/empleado.service';
import { IDialogData } from 'src/app/shared/interfaces/dialog-data';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-movimiento-savel',
  templateUrl: './movimiento-savel.component.html',
  styleUrls: ['./movimiento-savel.component.css']
})
export class MovimientoSavelComponent implements OnInit {
  txtAction: string = 'Crear';

  form!: FormGroup;
  loading: boolean = true;
  id:number = 0;
  meses: ICatMes[] = [];
  empleados:IEmpleado[]=[];
  rolEmpleado:IEmpleadoRol|null  =null;


  constructor(
    private _movimientosService:MovimientoService,
    private _empleadoService: EmpleadoService,
    private _mesService: CatMesService,
    private _rolesService: EmpleadoRolService,
    private _snakBar: MatSnackBar,
    private _formBuil: FormBuilder,
    public dialogRef: MatDialogRef<number>,
    @Inject(MAT_DIALOG_DATA) private _data: IDialogData

  ) {
    this.form = this.FormSaveBuilder();
    this.id = _data.id;
  }

  ngOnInit(): void {
    this.GetMeses();
    this.GetEmpleados();
    if(this.id!=0){
      this.GetMovimiento(this.id);
      this.txtAction = 'Actualizar';

    }else{
      this.loading = false;
    }

  }

  GetMeses(){
    this._mesService.ReadAll().subscribe({
      next:(v)=>this.meses = v,
      error:(e)=>this._snakBar.open(e.error.text,'OK',{duration:5000})
    });
  }

  GetEmpleados(){
    this._empleadoService.ReadAll().subscribe({
      next:(v)=>this.empleados = v,
      error:(e)=>this._snakBar.open(e.error.text,'OK',{duration:5000})
    });
  }


  GetMovimiento(id:number){
    this._movimientosService.ReadOne(id).subscribe({
    next:(v)=>{
      this.form.patchValue(v);
      this.loading = false;
    },
    });
  }

  onSave(id:number){

    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    if(id == 0){
      this._movimientosService.Create(this.form.value).subscribe({
        next:(v)=>{
          this._snakBar.open('Creado','OK',{duration:3000});
          this.dialogRef.close();
        },
        error:(e)=>this._snakBar.open(e,'OK',{duration:5000})
      });
    }else{
      this._movimientosService.Update(this.form.value).subscribe({
        next:()=> {
           this._snakBar.open('Actualizado','OK',{duration:3000});
          this.dialogRef.close();
        },
        error:(err)=> {
          this._snakBar.open(err.error.text,'OK',{duration:5000});
          console.log(err);
        },
      } );
    }

  }


  onDelete(id:number){
    this._movimientosService.Delete(id).subscribe(
      ()=>{
        this._snakBar.open('movimiento eliminado correctamente','OK',{duration:2000});
        this.dialogRef.close();
      }
    );
  }

  showRequired(){
    this.form.markAllAsTouched();
  }

  FormSaveBuilder(){
    return this._formBuil.group({
      id:         [this.id],
      idEmpleado:     [null,Validators.required],
      numEntregas:    [null,Validators.required],
      idMes: [null,Validators.required],
      anio: [new Date().getFullYear(),Validators.required]
    });
  }

  onSelectEmpleado(empleadoid:number){
    const empleado:IEmpleado | undefined = this.empleados.find(x=>x.id==empleadoid);
    if(empleado==undefined) return;
    this._rolesService.ReadOne(empleado.id).subscribe({
      next:(value)=> {
        this.rolEmpleado=value;
      },
    });
  }

}
