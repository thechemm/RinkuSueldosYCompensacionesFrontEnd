import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRetencion } from '../interfaces/retencion';

@Injectable({
  providedIn: 'root'
})
export class RetencionService {
  apiUrl: string = environment.ApiUrl;
  constructor(
    private _httpClient: HttpClient
  ) {}

  Create(item:IRetencion): Observable<IRetencion>{
    return this._httpClient.post<IRetencion>(this.apiUrl + '/api/Retenciones', item);
  }

  ReadOne(id:number): Observable<IRetencion>{
    return this._httpClient.get<IRetencion>(this.apiUrl + '/api/Retenciones/'+id);
  }

  ReadAll(): Observable<IRetencion[]>{
    return this._httpClient.get<IRetencion[]>(this.apiUrl + '/api/Retenciones');
  }

  Update(item:IRetencion): Observable<object>{
    return this._httpClient.put(this.apiUrl + '/api/Retenciones/' + item.id, item);
  }

  Delete(id:number): Observable<object>{
    return this._httpClient.delete(this.apiUrl + '/api/Retenciones/' + id);
  }

}

