import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovimiento } from '../interfaces/movimiento';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  apiUrl: string = environment.ApiUrl;
  constructor(
    private _httpClient: HttpClient
  ) {}

  Create(item:IMovimiento): Observable<IMovimiento>{
    return this._httpClient.post<IMovimiento>(this.apiUrl + '/api/Movimientos', item);
  }

  ReadOne(id:number): Observable<IMovimiento>{
    return this._httpClient.get<IMovimiento>(this.apiUrl + '/api/Movimientos/'+id);
  }

  ReadAll(): Observable<IMovimiento[]>{
    return this._httpClient.get<IMovimiento[]>(this.apiUrl + '/api/Movimientos');
  }

  Update(item:IMovimiento): Observable<object>{
    return this._httpClient.put(this.apiUrl + '/api/Movimientos/' + item.id, item);
  }

  Delete(id:number): Observable<object>{
    return this._httpClient.delete(this.apiUrl + '/api/Movimientos/' + id);
  }

}

