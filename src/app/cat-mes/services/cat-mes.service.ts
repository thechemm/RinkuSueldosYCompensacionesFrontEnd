import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICatMes } from '../interfaces/cat-mes';

@Injectable({
  providedIn: 'root'
})
export class CatMesService {
  apiUrl: string = environment.ApiUrl;
  constructor(
    private _httpClient: HttpClient
  ) {}

  Create(item:ICatMes): Observable<ICatMes>{
    return this._httpClient.post<ICatMes>(this.apiUrl + '/api/CatMeses', item);
  }

  ReadOne(id:number): Observable<ICatMes>{
    return this._httpClient.get<ICatMes>(this.apiUrl + '/api/CatMeses/'+id);
  }

  ReadAll(): Observable<ICatMes[]>{
    return this._httpClient.get<ICatMes[]>(this.apiUrl + '/api/CatMeses');
  }

  Update(item:ICatMes): Observable<object>{
    return this._httpClient.put(this.apiUrl + '/api/CatMeses/' + item.id, item);
  }

  Delete(id:number): Observable<object>{
    return this._httpClient.delete(this.apiUrl + '/api/CatMeses/' + id);
  }

}
