import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ISueldoFiltro } from '../interfaces/sueldo-filtro';
import { ISueldoMensual } from '../interfaces/sueldo-mensual';

@Injectable({
  providedIn: 'root'
})
export class SueldoMensualService  {
  apiUrl: string = environment.ApiUrl;
  constructor(
    private _httpClient: HttpClient
  ) {}

  GetSueldos(item:ISueldoFiltro): Observable<ISueldoMensual[]>{
    return this._httpClient.post<ISueldoMensual[]>(this.apiUrl + '/api/Empleados/SueldoMensual', item);
  }
}
