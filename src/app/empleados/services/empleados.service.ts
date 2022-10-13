import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmpleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  apiUrl: string = environment.ApiUrl;
  constructor(
    private _httpClient: HttpClient
  ) {}

  Create(item:IEmpleado): Observable<object>{
    return this._httpClient.post(this.apiUrl + '/api/Empleados', item);
  }

  ReadOne(id:number): Observable<IEmpleado>{
    return this._httpClient.get<IEmpleado>(this.apiUrl + '/api/Empleados/'+id);
  }

  ReadAll(): Observable<IEmpleado[]>{
    return this._httpClient.get<IEmpleado[]>(this.apiUrl + '/api/Empleados');
  }

  Update(item:IEmpleado): Observable<object>{
    return this._httpClient.put(this.apiUrl + '/api/Empleados/' + item.id, item);
  }

  Delete(id:number): Observable<object>{
    return this._httpClient.delete(this.apiUrl + '/api/Empleados/' + id);
  }
}
