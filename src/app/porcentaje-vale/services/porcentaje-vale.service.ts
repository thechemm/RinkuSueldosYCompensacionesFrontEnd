import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPorcentajeVale } from '../interfaces/porcentaje-vale';

@Injectable({
  providedIn: 'root'
})
export class PorcentajeValeService {
  apiUrl: string = environment.ApiUrl;
  constructor(
    private _httpClient: HttpClient
  ) {}

  Create(item:IPorcentajeVale): Observable<IPorcentajeVale>{
    return this._httpClient.post<IPorcentajeVale>(this.apiUrl + '/api/PorcentajeVales', item);
  }

  ReadOne(id:number): Observable<IPorcentajeVale>{
    return this._httpClient.get<IPorcentajeVale>(this.apiUrl + '/api/PorcentajeVales/'+id);
  }

  ReadAll(): Observable<IPorcentajeVale[]>{
    return this._httpClient.get<IPorcentajeVale[]>(this.apiUrl + '/api/PorcentajeVales');
  }

  Update(item:IPorcentajeVale): Observable<object>{
    return this._httpClient.put(this.apiUrl + '/api/PorcentajeVales/' + item.id, item);
  }

  Delete(id:number): Observable<object>{
    return this._httpClient.delete(this.apiUrl + '/api/PorcentajeVales/' + id);
  }

}

