import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/empleado-roles/services/roles.service';
import { IDialogData } from 'src/app/shared/interfaces/dialog-data';
import { IEmpleadoRol } from '../../empleado-roles/interfaces/empleado-rol';
import { EmpleadosService } from '../services/empleados.service';

@Component({
  selector: 'app-empleados-save',
  templateUrl: './empleados-save.component.html',
  styleUrls: ['./empleados-save.component.css']
})
export class EmpleadosSaveComponent implements OnInit {
  txtAction: string = 'Crear';

  form!: FormGroup;
  loading: boolean = true;
  id:number = 0;
  roles: IEmpleadoRol[] = [];

  constructor(
    private _empleadoService : EmpleadosService,
    private _rolesService:RolesService,
    private _snakBar: MatSnackBar,
    private _formBuil: FormBuilder,
    public dialogRef: MatDialogRef<number>,
    @Inject(MAT_DIALOG_DATA) private _data: IDialogData

  ) {
    this.form = this.FormSaveBuilder();
    this.id = _data.id;
  }

  ngOnInit(): void {
    this.getRoles();
    if(this.id!=0){
      this.GetEmpleado(this.id);
      this.txtAction = 'Actualizar';

    }else{
      this.loading = false;
    }

  }

  getRoles(){
    this._rolesService.ReadAll().subscribe({
      next:(v)=>{
        this.roles = v
      },
      error:(e)=>{
        console.log(e)
        this._snakBar.open(e.error.text,'OK',{duration:5000});
      }

    });
  }



  GetEmpleado(id:number){
    this._empleadoService.ReadOne(id).subscribe({
    next:(v)=>{
      this.form.patchValue(v);
      this.loading = false;
    },
    complete: ()=>{this.loading = false;}
    });
  }

  onSave(id:number){
    if(!this.form.valid){
      this.form.markAllAsTouched();
      console.log('formulario no valido')
      return;
    }
    console.log(this.form.value);
    if(id == 0){
      this._empleadoService.Create(this.form.value).subscribe({
        next:(v)=>{
          this._snakBar.open('Creado','OK',{duration:3000});
          this.dialogRef.close();
        },
        error:(e)=>{
          console.log(e)
          this._snakBar.open(e,'OK',{duration:5000})
        }
      });
    }else{
      this._empleadoService.Update(this.form.value).subscribe({
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
    this._empleadoService.Delete(id).subscribe(
      ()=>{
        this._snakBar.open('Usario eliminado correctamente','OK',{duration:2000});
        this.dialogRef.close();
      }
    );
  }

  showRequired(){
    this.form.markAllAsTouched();
  }



  FormSaveBuilder(){
    return this._formBuil.group({
      id:    [this.id],
      rolId:  [null],
      numero: [null, Validators.required],
      nombre: [null, Validators.required]
    });
  }



}
