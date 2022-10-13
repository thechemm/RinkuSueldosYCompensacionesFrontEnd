import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmpleadoRol } from '../interfaces/empleado-rol';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  apiUrl: string = environment.ApiUrl;
  constructor(
    private _httpClient: HttpClient
  ) {}

  Create(item:IEmpleadoRol): Observable<object>{
    return this._httpClient.post(this.apiUrl + '/api/EmpleadoRoles', item);
  }

  ReadOne(id:number): Observable<IEmpleadoRol>{
    return this._httpClient.get<IEmpleadoRol>(this.apiUrl + '/api/EmpleadoRoles/'+id);
  }

  ReadAll(): Observable<IEmpleadoRol[]>{
    return this._httpClient.get<IEmpleadoRol[]>(this.apiUrl + '/api/EmpleadoRoles');
  }
  Update(item:IEmpleadoRol): Observable<object>{
    return this._httpClient.put(this.apiUrl + '/api/EmpleadoRoles/' + item.id, item);
  }

  Delete(id:number): Observable<object>{
    return this._httpClient.delete(this.apiUrl + '/api/EmpleadoRoles/' + id);
  }
}
