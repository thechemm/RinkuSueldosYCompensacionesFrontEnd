import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEmpleadoRol } from 'src/app/empleado-rol/interfaces/empleado-rol';
import { EmpleadoRolService } from 'src/app/empleado-rol/services/empleado-rol.service';
import { IDialogData } from 'src/app/shared/interfaces/dialog-data';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-empleado-savel',
  templateUrl: './empleado-savel.component.html',
  styleUrls: ['./empleado-savel.component.css']
})
export class EmpleadoSavelComponent implements OnInit {
  txtAction: string = 'Crear';

  form!: FormGroup;
  loading: boolean = true;
  id:number = 0;
  roles: IEmpleadoRol[] = [];
  adminSelect: boolean = false;

  constructor(
    private _empleadoService: EmpleadoService,
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
    this.getPerfiles();
    if(this.id!=0){
      this.GetUser(this.id);
      this.txtAction = 'Actualizar';

    }else{
      this.loading = false;
    }

  }

  getPerfiles(){
    this._rolesService.ReadAll().subscribe({
      next:(v)=>this.roles = v,
      error:(e)=>this._snakBar.open(e.error.text,'OK',{duration:5000})
    });
  }


  GetUser(id:number){
    this._empleadoService.ReadOne(id).subscribe({
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
    if(id == 0){
      this._empleadoService.Create(this.form.value).subscribe({
        next:(v)=>{
          this._snakBar.open('Creado','OK',{duration:3000});
          this.dialogRef.close();
        },
        error:(e)=>this._snakBar.open(e,'OK',{duration:5000})
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
      id:         [this.id],
      rolId:     [null,Validators.required],
      numero:    [null,Validators.required],
      nombre: [null,Validators.required]
    });
  }

}

